import { IUserAdapter } from "../../domain/user/userAdapter.interface.ts";
import { UserEntity } from "./user.entity.ts";
import UserRepository from "./user.repository.ts";

export default class UserAdapter implements IUserAdapter {
    /**
     *
     */
    constructor(private repo: UserRepository) {        
    }
    signUpUser: () => void = () => {
        return
    };

    signInUser = async (userInfos: {email: string, password?: string}) => {
        const dbUser: UserEntity = await this.repo.getByAttribute('email', userInfos.email);

        return this.repo.convertToDomain(dbUser);
    };


}