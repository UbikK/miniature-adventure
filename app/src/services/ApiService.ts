import { API_URL } from "@env";
import { User as GoogleUser } from '@react-native-google-signin/google-signin';
import { User } from "../types/domain";
import { PlacePrediction } from "./GooglePlaceService";

export const getAll = async (userId: string) => {
  console.info('userId', userId)
  try {
    const response = await fetch(`${API_URL}/poi/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.info('result', result)
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const save = async (place: PlacePrediction) => {
  console.info("api place::", place);
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
