import { GOOGLE_MAPS_API_KEY } from '@env';
import { getCurrentPositionAsync } from '../polyfills/Geolocation';
const GOOGLE_MAPS_URL =
  'https://maps.googleapis.com/maps/api/place/autocomplete/json';

type GooglePlacesAutocompleteResponseBody = {
  status: GooglePlacesAutocompleteStatus;
  predictions: PlacePrediction[];
};

export enum GooglePlacesAutocompleteStatus {
  OK = 'OK',
  ZERO_RESULTS = 'ZERO_RESULTS',
  INVALID_REQUEST = 'ZERO_RESULTS',
  OVER_QUERY_LIMIT = 'ZERO_RESULTS',
  REQUEST_DENIED = 'ZERO_RESULTS',
  UNKNOWN_ERROR = 'ZERO_RESULTS',
}

export type PlacePrediction = {
  description: string;
  place_id: string;
  reference: string;
  types: string[];
};


export const getAutocompletePredictions: (
  input: string,
) => Promise<PlacePrediction[] | GooglePlacesAutocompleteStatus> = async (
  input: string,
) => {
  const currentLoc = await getCurrentPositionAsync();
  const encodedLocation = `${encodeURIComponent(currentLoc.coords.latitude + ',')}${currentLoc.coords.longitude}`
  //&location=${encodedLocation}&radius&origin=${encodedLocation}
  const url = `${GOOGLE_MAPS_URL}?key=${GOOGLE_MAPS_API_KEY}&input=${input}&location=${encodedLocation}&radius=1000&origin=${encodedLocation}&language=fr&types=establishment`;

  const response = await fetch(url);
  const body: GooglePlacesAutocompleteResponseBody = await response.json();
  if (body.status !== GooglePlacesAutocompleteStatus.OK) {
    return body.status as GooglePlacesAutocompleteStatus;
  }
  return body.predictions;
};

export const getPhoto = async (photoId: string) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoId}&key=${GOOGLE_MAPS_API_KEY}`);

  return await response.blob();
}
