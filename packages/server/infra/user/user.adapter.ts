import { IUserAdapter, User } from "domain";
import { UserEntity } from "./user.entity.ts";
import UserRepository from "./user.repository.ts";

export default class UserAdapter implements IUserAdapter {
   constructor(private repo: UserRepository) {}
    
    signUpUser = async(userInfos: UserEntity) => {
        let dbUser: UserEntity | undefined = await this.repo.findByAttribute({attr: 'email', value: userInfos.email});

        if(!dbUser) {
           dbUser = await this.repo.save(userInfos);
           console.info(dbUser)
        }

        return new User(dbUser);
    };

    getUserInfos = async (email: string) => {
        const user = await  this.repo.findByAttribute({attr: 'email', value: email}  );
        console.info(user)
        if(!user) return undefined
        return new User(user)
    };

}