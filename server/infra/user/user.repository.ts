import { hash } from 'bcrypt';
import IRepository from "../../domain/Repository.interface.ts";
import User from "../../domain/user/user.model.ts";
import { UserEntity, UserSchema } from "./user.entity.ts";

export default class UserRepository implements IRepository<UserEntity, User>{
    constructor(private db: any) {}
    getById = async (id: string) => {
        const result = await this.db`
            select * from public.user where id = ${id}
        `
        return UserSchema.parse(result)
    }


    save = async (data: UserEntity) => {
        const hashed = await hash(data.password as string);
        const result = await this.db`
            insert into users (
                firstname, lastname, email, password
              ) values (
                ${data.firstName}, ${data.lastName}, ${data.email}, ${hashed}
              )
            
              returning *
        `
        return UserSchema.parse(result);
    }

    getByAttribute = async (attr: keyof UserEntity, value: string) => {
        const result: UserEntity[] = await this.db<UserEntity[]>`
            select * from public.user where ${this.db(attr)} = ${value};
        `

        console.info(result)
        return UserSchema.parse(result[0])        
    }

    convertToDomain = (data: UserEntity) => {
        return new User(data);
    };
}