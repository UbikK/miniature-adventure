import { hookstate } from "@hookstate/core";
import { User } from "@react-native-google-signin/google-signin";

type State = {
    userInfos?: User
}

export const globalState = hookstate<State>({});