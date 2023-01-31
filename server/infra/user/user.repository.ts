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

        console.info(`
        insert into public.user (
            firstname, lastname, email, password, googleinfos
          ) values (
            ${data.firstName ?? data.googleInfos?.user.givenName ?? null},
            ${data.lastName ?? data.googleInfos?.user.familyName ?? null}, 
            ${data.email}, 
            ${hashed?? null}, 
            ${JSON.stringify(data.googleInfos) ?? null}
          )
        
          returning *
    `)
        const result = await this.db`
            insert into public.user (
                firstname, lastname, email, password, googleinfos
              ) values (
                ${data.firstName ?? data.googleInfos?.user.givenName ?? null},
                ${data.lastName ?? data.googleInfos?.user.familyName ?? null}, 
                ${data.email}, 
                ${hashed?? null}, 
                ${JSON.stringify(data.googleInfos) ?? null}
              )
            
              returning *
        `

        console.info(result)
        return UserSchema.parse(result[0]);
    }

    getByAttribute = async (attr: keyof UserEntity, value: string) => {
        const result: UserEntity[] = await this.db<UserEntity[]>`
            select * from public.user where ${this.db(attr)} = ${value};
        `

        console.info('getByAttribute', result)
        if(!result.length) return;
        return UserSchema.parse(result[0])        
    }

    convertToDomain = (data: UserEntity) => {
        return new User(data);
    };
}