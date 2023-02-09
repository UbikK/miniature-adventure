import User from "./user.model";

export type IUserAdapter = {
    signUpUser: (userInfos: {email: string, password: string}) => Promise<User>;
    getUserInfos: (email: string) => Promise<User | undefined>;
}