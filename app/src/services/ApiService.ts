import { API_URL } from "@env";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../helpers/supabase";
import { PlacePrediction } from "./GooglePlaceService";

export default class ApiService {
    private static instance: ApiService;
    private client: SupabaseClient

    private constructor(){
        this.client = supabase;
    }

    static getInstance = () => {
        if(!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    public getAll = async () => {
        const response = await fetch(`${API_URL}/functions/v1/place-api`);

        return response.json();
    }
    
    public save = async (place: PlacePrediction) => {
        console.info(API_URL)
        try {
            const result = await supabase.functions.invoke('save-place', {
                body: { id:place.place_id }
              })
    
            return result
        } catch(e) {
            console.error(e)
        }
        ;
    }
}

