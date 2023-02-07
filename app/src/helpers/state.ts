import { hookstate } from "@hookstate/core";
import { PointOfInterest, User } from "../types/domain";

type State = {
    userInfos?: User,
    places?: PointOfInterest[],
    isSignedIn: boolean
}

export const globalState = hookstate<State>({isSignedIn: false});