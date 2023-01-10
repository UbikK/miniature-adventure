import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import {Client, PlaceInputType} from "https://esm.sh/@googlemaps/google-maps-services-js@3"
console.log("Hello from Functions!")

serve(async (req: Request) => {
  const { input } = await req.json()
 
  const client = new Client({});
  const key: string = Deno.env.get("GOOGLE_MAPS_API_KEY") as string;

  const result = await client.placeQueryAutocomplete({params:{
    input,
    key
  }})

  return new Response(
    JSON.stringify(result.data.predictions),
    { headers: { "Content-Type": "application/json" } },
  )
})
