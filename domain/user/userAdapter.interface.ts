import User from "./user.model.ts";

export type IUserAdapter = {
    signUpUser: (userInfos: {email: string, password: string}) => Promise<User>
}