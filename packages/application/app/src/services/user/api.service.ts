import { API_URL } from "@env";
import { User } from "@miniature_adventure/domain";



export const saveUser = async (userInfos: any) => {
  try {
    const response = await fetch(`${API_URL}/users/`, {
      method: "POST",
      body: JSON.stringify({
        email: userInfos.user.email,
        googleInfos: userInfos,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const result: User = new User(await response.json());

    return result;
  } catch (e) {
    console.info(e);
  }
};

export const getUser = async (email: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${email}`);
    const result = await response.json();
    return new User(result);
  } catch (e) {
    console.error(e)
  }
  
}

