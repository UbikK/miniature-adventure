// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { AddressComponent, AddressType } from "https://esm.sh/@googlemaps/google-maps-services-js@3.3.26";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.4.0";

const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey',
}
console.log("Hello from Functions!")

serve(async (req) => {
  const { id } = await req.json()


  const supabaseClient = createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get('API_URL') ?? '',
    // Supabase API ANON KEY - env var exported by default.
    Deno.env.get('API_ANON_KEY') ?? '',
    // Create client with Auth context of the user that called the function.
    // This way your row-level-security (RLS) policies are applied.
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  )
  
    // const googlePlacesClient = new Client();
  
    // const detailsResponse =await googlePlacesClient.placeDetails({
    //   params:{
    //     place_id:id,
    //     key: Deno.env.get('GOOGLE_MAPS_API_KEY') ?? '',
    //     fields: ['address_components','geometry/location','name','photo'],
    //     language: Language.fr,
    //   }
    // });
    try {
      const response = await fetch(`${GOOGLE_PLACES_API_URL}?place_id=${id}&fields=address_components,geometry/location,name,photo&language=fr&key=${Deno.env.get('GOOGLE_MAPS_API_KEY')}`)

      const detailsResponse = await response.json();
  
    
      if (detailsResponse.status !== 'OK') {
        throw new Error(detailsResponse.statusText);
      }
    
      const addressComponents = detailsResponse.result.address_components;
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
        coordinates: `${detailsResponse.result.geometry!.location.lat},${detailsResponse.result.geometry!.location.lat}`,
        address_id: savedAddress[0].id as string,
        name: detailsResponse.result.name!,
        photo_id: detailsResponse.result.photos![0].photo_reference,
        user_id:(await supabaseClient.auth.getUser()).data.user!.id
      };
    
    
      const { error } = await supabaseClient.from('point_of_interest').insert(place);
      if (error) throw error;
    
      return new Response(JSON.stringify({ place }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch(e) {
      console.error(e)
      throw e;
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