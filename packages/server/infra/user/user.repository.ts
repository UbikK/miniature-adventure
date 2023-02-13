import { hash } from 'bcrypt';
import { IRepository, User } from 'domain';
import { UserEntity, UserSchema } from "./user.entity.ts";

export default class UserRepository implements IRepository<UserEntity, User>{
    constructor(private db: any) {}
    findById = async (id: string) => {
        const result = await this.db<UserEntity[]>`
            select * from public.user where id = ${id}
        `
        return UserSchema.parse({...result[0], googleinfos: JSON.parse(result[0].googleinfos)})
    }


    save = async (data: UserEntity) => {
        const hashed = await hash(data.password as string);

        const result = await this.db<UserEntity[]>`
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

    findByAttribute = async ({attr, value}: {attr: keyof UserEntity, value: string}) => {
        const result: any[] = await this.db<UserEntity[]>`
            select id, firstname, lastname, email, password, googleinfos::jsonb from public.user where ${this.db(attr)} = ${value};
        `

        if(!result.length) return;
        const formattedResult = {...result[0], googleinfos: JSON.parse(result[0].googleinfos)}
        return UserSchema.parse(formattedResult)
    }
}