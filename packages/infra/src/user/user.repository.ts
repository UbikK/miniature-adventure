import { IRepository, User } from '@domain';
import { hash } from 'bcrypt';
import { UserEntity, UserSchema } from "./user.entity.ts";

export default class UserRepository implements IRepository<UserEntity, User>{
    constructor(private db: any) {}
    findById = async (id: string) => {
        const result = await this.db<UserEntity[]>`
            select * from public.user where id = ${id}
        `
        return UserSchema.parse(result[0])
    }


    save = async (data: UserEntity) => {
        const hashed = await hash(data.password as string);

        const result = await this.db<UserEntity[]>`
            insert into public.user (
                ${this.db(Object.keys(data))}
              ) values (
                ${data.firstName ?? data.googleInfos?.user.givenName ?? null},
                ${data.lastName ?? data.googleInfos?.user.familyName ?? null}, 
                ${data.email}, 
                ${hashed?? null}, 
                ${JSON.stringify(data.googleInfos) ?? null}
              )
            
              returning *
        `
        return UserSchema.parse({...result[0], googleinfos: JSON.parse(result[0].googleinfos)});
    }

    findByAttribute = async ({attr, value}: {attr: keyof UserEntity, value: string}) => {
        const result: any[] = await this.db<UserEntity[]>`
            select * from public.user where ${this.db(attr)} = ${value};
        `
        if(!result.length) return;
        return UserSchema.parse(result[0])
    }
}