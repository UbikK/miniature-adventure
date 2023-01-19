import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { AddressComponent, AddressType, Client, Language } from "https://esm.sh/@googlemaps/google-maps-services-js@3.3.26";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.4.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
}

const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place';

const getAllPointsOfInterest = async (supabaseClient: SupabaseClient) => {
  const { data: places, error } = await supabaseClient.from('point_of_interest').select('*')
  if (error) throw error

  return new Response(JSON.stringify({ places }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
}

const savePlace = async (supabaseClient: SupabaseClient, id: string) => {
  
  const googlePlacesClient = new Client();

  const detailsResponse =await googlePlacesClient.placeDetails({
    params:{
      place_id:id,
      key: Deno.env.get('GOOGLE_MAPS_API_KEY') ?? '',
      fields: ['address_components','geometry/location','name','photo'],
      language: Language.fr,
    }
  });

  if (detailsResponse.status !== 200) {
    throw new Error(detailsResponse.statusText);
  }

  const addressComponents = detailsResponse.data.result.address_components;
  const address: Address = {
    street: `${addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.street_number))?.long_name} ${addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.route))?.long_name}`,
    zipcode: addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.postal_code))!.long_name,
    city: addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.locality))!.long_name ?? addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.administrative_area_level_2))!.long_name,
    country: addressComponents!.find((a: AddressComponent) => a.types.includes(AddressType.country))!.long_name,
  };

  const { error: addressError, data: savedAddress } = await supabaseClient.from('address').insert(address).select<"*", Address>();
  if (addressError) throw addressError;

  const place: Place = {
    place_id: id,
    coordinates: `${detailsResponse.data.result.geometry!.location.lat},${detailsResponse.data.result.geometry!.location.lat}`,
    address_id: savedAddress[0].id as string,
    name: detailsResponse.data.result.name!,
    photo_id: detailsResponse.data.result.photos![0].photo_reference,
    user_id:(await supabaseClient.auth.getUser()).data.user!.id
  };


  const { error } = await supabaseClient.from('point_of_interest').insert(place);
  if (error) throw error;

  return new Response(JSON.stringify({ place }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  });
}

serve(async (req: Request) => {
  console.info('Hello API')
  const {url, method} = req;

  if (method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  try {
  const supabaseClient = createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get('API_URL') ?? '',
    // Supabase API ANON KEY - env var exported by default.
    Deno.env.get('API_ANON_KEY') ?? '',
    // Create client with Auth context of the user that called the function.
    // This way your row-level-security (RLS) policies are applied.
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  )

  const taskPattern = new URLPattern({ pathname: '/places/:id' });
  const matchingPath = taskPattern.exec(url);
  const id = matchingPath ? matchingPath.pathname.groups.id : null;

    let place;
    if (method === 'PUT') {
      const body = await req.json()
      place = body.task
    }

    // call relevant method based on method and id
    switch (method) {
      // case id && method === 'GET':
      //   return getTask(supabaseClient, id as string)
      // case id && method === 'PUT':
      //   return updateTask(supabaseClient, id as string, place)
      // case id && method === 'DELETE':
      //   return deleteTask(supabaseClient, id as string)
      case 'POST':
        return savePlace(supabaseClient, id as string)
      // case method === 'GET':
      //   return getAllTasks(supabaseClient)
      default:
        return getAllPointsOfInterest(supabaseClient)
    }
  } catch (error) {
    console.error(error)

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'


type Place = {
  id?: string;
  place_id: string;
  coordinates: string;
  address_id: string;
  photo_id: string;
  name: string;
  user_id: string;
}

type Address = {
  id?: string;
  street: string;
  zipcode: string;
  city: string;
  country: string;
}