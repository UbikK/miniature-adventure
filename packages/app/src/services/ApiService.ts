import { API_URL } from "@env";
import { PointOfInterestDto, User } from "@miniature_adventure/domain";
import { User as GoogleUser } from '@react-native-google-signin/google-signin';
import { getCurrentPositionAsync } from "../polyfills/Geolocation";

export const getAllPlacesForUser = async (userId: string) => {
  console.info('userId', userId)
  try {
    const response = await fetch(`${API_URL}/poi/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();

    return result;
  } catch (e) {
    console.error(e);
  }
};

export const savePlace = async (place: PointOfInterestDto) => {
  try {
    console.info(place)
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

export const saveUser = async (userInfos: GoogleUser) => {
  try {
    const response = await fetch(`${API_URL}/users/`, {
      method: "POST",
      body: JSON.stringify({
        email: userInfos.user.email,
        googleInfos: userInfos,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const result: User = await response.json();

    return result;
  } catch (e) {
    console.info(e);
  }
};

export const getUser = async (email: string) => {
  try {
    console.info('email', email)
    const response = await fetch(`${API_URL}/users/${email}`);

    const result = await response.json();

    return new User(result);
  }catch (e) {
    console.error(e)
  }
  
}

export const getAutocompletePredictions: (
  input: string,
) => Promise<PointOfInterestDto[]> = async (
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
  
  return body;
};
