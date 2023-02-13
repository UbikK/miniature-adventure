import { IUserAdapter, User } from "@domain";
import { UserDto } from "./user.dto.ts";
import { UserEntity } from "./user.entity.ts";
import UserRepository from "./user.repository.ts";

export default class UserAdapter implements IUserAdapter {
   constructor(private repo: UserRepository) {}
    toDto: (model: User) => UserDto = (model) => {
        return {
            id: model.id,
            lastName: model.lastName,
            firstName: model.firstName,
            email: model.email,
            googleInfos: model.googleInfos
        } 
    };
    
    signUpUser = async(userInfos: UserEntity) => {
        let dbUser: UserEntity | undefined = await this.repo.findByAttribute({attr: 'email', value: userInfos.email});

        if(!dbUser) {
           dbUser = await this.repo.save(userInfos);
        }

        if(!dbUser) return;

        return new User(dbUser);
    };

    getUserInfos = async (email: string) => {
        const user = await  this.repo.findByAttribute({attr: 'email', value: email}  );
        if(!user) return undefined
        return new User(user)
    };

}