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
            insert into public.user (
                firstname, lastname, email, password, googleinfos
              ) values (
                ${data.firstname ?? data.googleinfos?.user.givenName ?? null},
                ${data.lastname ?? data.googleinfos?.user.familyName ?? null}, 
                ${data.email}, 
                ${hashed?? null}, 
                ${JSON.stringify(data.googleinfos) ?? null}
              )
            
              returning *
        `
        return UserSchema.parse({...result[0], googleinfos: JSON.parse(result[0].googleinfos)});
    }

    getByAttribute = async (attr: keyof UserEntity, value: string) => {
        const result: any[] = await this.db<UserEntity[]>`
            select id, firstname, lastname, email, password, googleinfos::jsonb from public.user where ${this.db(attr)} = ${value};
        `

        console.info('getByAttribute', result)
        if(!result.length) return;
        const formattedResult = {...result[0], googleinfos: JSON.parse(result[0].googleinfos)}
        console.info(formattedResult)
        return UserSchema.parse(formattedResult)
    }

    convertToDomain = (data: UserEntity) => {
        return new User(data);
    };
}