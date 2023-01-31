import { IUserAdapter } from "../../domain/user/userAdapter.interface.ts";
import { UserEntity } from "./user.entity.ts";
import UserRepository from "./user.repository.ts";

export default class UserAdapter implements IUserAdapter {
    /**
     *
     */
    constructor(private repo: UserRepository) {        
    }
    signUpUser = async(userInfos: UserEntity) => {
        console.info(userInfos)
        let dbUser: UserEntity | undefined = await this.repo.getByAttribute('email', userInfos.email);
        console.info('dbUser', dbUser);

        if(!dbUser) {
           dbUser = await this.repo.save(userInfos);
           console.info(dbUser)
        }

        return this.repo.convertToDomain(dbUser);
    };
}