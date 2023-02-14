import { API_URL } from "@env";
import { Address, PointOfInterest, User } from "@miniature_adventure/domain";
import { getCurrentPositionAsync } from "../../polyfills/Geolocation";

export type PointOfInterestProps = {
  name: string;
  photoId: string;
  placeId: string;
  address: any;
  tags: (string|undefined)[];
}

type PoiDto = 
  {
    placeId?: string,
    name?: string,
    address?: Address,
    user?: User,
    photoId?: string,
    addressId?: string,
    userId?: string,
    coordinates?:string,
    tags?: (string|undefined)[]
  }


const mapToProps = (data: PoiDto): PointOfInterestProps => {
  return {
    name: data.name!,
    photoId: data.photoId!,
    placeId: data.placeId!,
    address: data.address!,
    tags: data.tags!
  }
}

export const getAllPlacesForUser = async (userId: string): Promise<PointOfInterestProps[] | undefined> => {
    try {
      const response = await fetch(`${API_URL}/poi/user/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
  
      return result as PointOfInterestProps[];
    } catch (e) {
      console.error(e);
    }
  };

  export const savePlace = async (place: PointOfInterest) => {
    try {
      const response = await fetch(`${API_URL}/poi/`, {
        method: "POST",
        body: JSON.stringify(place),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
  
      return result;
    } catch (e) {
      console.error(e);
    }
  };

  export const getAutocompletePredictions: (
    input: string,
  ) => Promise<PointOfInterestProps[]> = async (
    input: string,
  ) => {
    const currentLoc = await getCurrentPositionAsync();
    const encodedLocation = `${encodeURIComponent(currentLoc.coords.latitude + ',')}${currentLoc.coords.longitude}`
  
  
    const response = await fetch(`${API_URL}/poi/get-predictions`, {
      method: 'POST',
      body: JSON.stringify({input, coords: encodedLocation}),
      headers: { "Content-Type": "application/json" },
    });
    const body = await response.json(); 
    console.info(body) 
    return body.map((p:any) => mapToProps(p))
  };
  