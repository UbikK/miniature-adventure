import { IUseCase, IUserAdapter, User } from "domain";

export default class SignUpUseCase implements IUseCase{
    constructor(private adapter: IUserAdapter) {}

    execute: (userInfos: {email: string, password: string, googleInfos?: any}) => Promise<User> = async (userInfos) => {
        return this.adapter.signUpUser(userInfos);
    };
}