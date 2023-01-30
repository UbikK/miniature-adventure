import IUseCase from "../../../domain/UseCase.interface.ts";
import { IUserAdapter } from "../../../domain/user/userAdapter.interface.ts";

export default class SignUpUseCase implements IUseCase{
    /**
     *
     */
    constructor(private adapter: IUserAdapter) {}

    execute: (userInfos: {email: string, password: string}) => void = (userInfos) => {
        return this.adapter.signUpUser(userInfos);
    };
}