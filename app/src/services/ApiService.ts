import { API_URL } from "@env";
import { User } from "@react-native-google-signin/google-signin";
import { PlacePrediction } from "./GooglePlaceService";

export const getAll = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/poi/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();

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

export const saveUser = async (userInfos: User) => {
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
