import User from "./user.model.ts";

export interface IUserAdapter {
    signUpUser: (userInfos: {email: string, password: string}) => Promise<User>
    //signInUser: (userInfos: {email: string, password?: string}) => Promise<User>
}