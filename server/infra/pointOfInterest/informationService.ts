import { Place, PlaceDetailsResponse } from 'maps';
import IInformationService from "../../domain/pointOfInterest/informationService.interface.ts";

export default class InformationService implements IInformationService {
    private readonly GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

    getPointOfInterestInformations = async (id: string): Promise<Place> => {
        const url = `${this.GOOGLE_PLACES_API_URL}?place_id=${id}&fields=address_components,geometry/location,name,photo&language=fr&key=${Deno.env.get('GOOGLE_MAPS_API_KEY')}`

        const response = await fetch(`${this.GOOGLE_PLACES_API_URL}?place_id=${id}&fields=address_components,geometry/location,name,photo&language=fr&key=${Deno.env.get('GOOGLE_MAPS_API_KEY')}`)

        const detailsResponse: PlaceDetailsResponse  = await response.json();

    
        if (detailsResponse.status !== 0) {
            throw new Error(detailsResponse.statusText);
        }

        return detailsResponse.data.result
    }

}