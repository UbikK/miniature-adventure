import { hookstate } from "@hookstate/core";
import { User } from "@react-native-google-signin/google-signin";

type State = {
    userInfos?: User,
    places?: any,
    isSignedIn: boolean
}

export const globalState = hookstate<State>({isSignedIn: false});