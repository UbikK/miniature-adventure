import {GOOGLE_MAPS_API_KEY} from '@env';
import {getCurrentPositionAsync} from '../polyfills/Geolocation';
const GOOGLE_MAPS_URL =
  'https://maps.googleapis.com/maps/api/place/autocomplete';

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
  const url = `${GOOGLE_MAPS_URL}?output=json&key=${GOOGLE_MAPS_API_KEY}&input=${input}&origin=${currentLoc.coords.latitude},${currentLoc.coords.longitude}f&language=fr`;
  const response = await fetch(url);
  const body: GooglePlacesAutocompleteResponseBody = await response.json();

  if (body.status !== GooglePlacesAutocompleteStatus.OK) {
    return body.status as GooglePlacesAutocompleteStatus;
  }
  return body.predictions;
};
