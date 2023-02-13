import { hookstate } from "@hookstate/core";
import { PointOfInterest, User } from "@miniature_adventure/domain";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getUser } from "../services/ApiService";

type State = {
    userInfos?: User,
    places?: PointOfInterest[],
    isSignedIn: boolean
}

const getUserInfos = async () => {
    if (await GoogleSignin.isSignedIn()) {
        return getUser((await GoogleSignin.getCurrentUser())!.user.email)
    }
}

export const global: () => Promise<State> = async () => {
    if (await GoogleSignin.isSignedIn()) {
        const userInfos = await getUserInfos();
        console.info('userInfos', userInfos)
        if(userInfos) return {isSignedIn: true, userInfos }
        
    } 
    return {isSignedIn: false}
}

export const globalstate = hookstate(global())