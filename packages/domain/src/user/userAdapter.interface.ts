import { IAdapter } from "../adapter.interface.ts";
import User from "./user.model.ts";

export interface IUserAdapter extends IAdapter<User> {
    signUpUser: (userInfos: {email: string, password: string}) => Promise<User | undefined>;
    getUserInfos: (email: string) => Promise<User | undefined>;
}