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
        try {
            const {error, data} = await supabase.functions.invoke('place-api', {body: {method: 'GET'}})
            if(error) throw error
            console.info(data)
            return data.places
        } catch(e) {
            console.error(e)
        }
    }
    
    public save = async (place: PlacePrediction) => {
        console.info('api place::', place)
        try {
            const {error, data} = await supabase.functions.invoke('place-api', {
                body: { data: { id:place.place_id }, method:'POST' },
              })
            if(error) throw error
            return data
        } catch(e) {
            console.error(e)
        }
        
    }
}

