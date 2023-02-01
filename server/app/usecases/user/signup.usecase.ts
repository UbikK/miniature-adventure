import IUseCase from "../../../domain/UseCase.ts";
import User from "../../../domain/user/user.model.ts";
import { IUserAdapter } from "../../../domain/user/userAdapter.interface.ts";

export default class SignUpUseCase extends IUseCase{
    /**
     *
     */
    constructor(private adapter: IUserAdapter) {
        super();
    }

    execute: (userInfos: {email: string, password: string, googleInfos?: any}) => Promise<User> = async (userInfos) => {
        return this.adapter.signUpUser(userInfos);
    };
}