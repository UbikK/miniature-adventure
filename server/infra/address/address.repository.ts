import { Address, IRepository } from "domain";
import postgres from "postgresjs";
import { AddressEntity, AddressSchema } from "./address.entity.ts";

export default class AddressRepository implements IRepository<AddressEntity, Address> {

    constructor(private db: postgres.Sql) {}
    findById: (id: string) => Promise<AddressEntity> = async (id) => {
        const result = await this.db<AddressEntity[]>`
            select * from public.address where id = ${id}
        `
        return AddressSchema.parse(result[0]);
    };
    
    save: (data: AddressEntity) => Promise<AddressEntity> = async (data) => {
        const result = await this.db<AddressEntity[]>`
            insert into public.address (
                street, zipcode, city, country
            ) values (
                ${data.street},
                ${data.zipcode}, 
                ${data.city}, 
                ${data.country}, 
            )
            
            returning *
        `
        return AddressSchema.parse(result[0]);
    };

    public findOne: (data: Partial<AddressEntity>) => Promise<AddressEntity|undefined>  = async (data) => {
        const records = await this.db<AddressEntity[]>`
            select * from public.address where street = ${data.street!} 
                and zipcode = ${data.zipcode!} 
                and city = ${data.city!} 
                and country = ${data.country!}
        `

        if (records && records.length) return AddressSchema.parse(records[0]);
        return undefined;
    }
}