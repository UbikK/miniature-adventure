import { IUserAdapter } from "../../domain/user/userAdapter.interface.ts";
import { UserEntity } from "./user.entity.ts";
import UserRepository from "./user.repository.ts";

export default class UserAdapter implements IUserAdapter {
    /**
     *
     */
    constructor(private repo: UserRepository) {}
    
    signUpUser = async(userInfos: UserEntity) => {
        let dbUser: UserEntity | undefined = await this.repo.getByAttribute('email', userInfos.email);

        if(!dbUser) {
           dbUser = await this.repo.save(userInfos);
           console.info(dbUser)
        }

        return this.repo.convertToDomain(dbUser);
    };
}