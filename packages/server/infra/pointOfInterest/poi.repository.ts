import { IRepository, PointOfInterest } from "domain";
import { PointOfInterestEntity, PointOfInterestSchema } from "./poi.entity.ts";

export default class PointOfInterestRepository
  implements IRepository<PointOfInterestEntity, PointOfInterest>
{
  constructor(private db: any) {}
  findById: (id: string) => Promise<PointOfInterestEntity> = async (id) => {
    const result = await this.db`
        select * from public.pointofinterest where id = ${id}
      `
      return PointOfInterestSchema.parse(result)
  };

  async save(data: PointOfInterestEntity) {
    const result = await this.db`
            insert into public.user (
                place_id, coordinates, address_id, photo_id, name, user_id, tags
            ) values (
                ${data.place_id},
                ${data.coordinates}, 
                ${data.address_id}, 
                ${data.photo_id}, 
                ${data.name}, 
                ${data.user_id}, 
                ${data.tags}
            )
            
            returning *
        `;
    return result;
  }

  findByAttribute = async (attr: keyof PointOfInterestEntity, value: string) => {
    const result: any[] = await this.db<PointOfInterestEntity[]>`
        select * from public.point_of_interest where ${this.db(attr)} = ${value};
    `

    if(!result.length) return;

    return result.map(i => PointOfInterestSchema.parse(i))
  }

}
