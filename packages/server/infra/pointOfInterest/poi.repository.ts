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
      return PointOfInterestSchema.parse({...result[0], tags: result[0].tags.split(',')})
  };

  async save(data: PointOfInterestEntity) {

    let poi: PointOfInterestEntity;
    const existingPoi = await this.findByAttribute('place_id', data.place_id);

    if(existingPoi) {
      poi = existingPoi[0];
    } else {
      const result = await this.db`
      insert into public.point_of_interest (
          place_id, coordinates, address_id, photo_id, name, user_id, tags
      ) values (
          ${data.place_id},
          ${data.coordinates}, 
          ${data.address_id}, 
          ${data.photo_id}, 
          ${data.name}, 
          ${data.tags}
      )
      
      returning *
  `;

      poi = PointOfInterestSchema.parse({...result[0], tags: result[0].tags.split(',')});
    }
    
    
    const existingJoint = await this.db`select * from public.point_of_interest where user_id = ${data.user_id} and poi_id = ${poi.id}`;

    if (existingJoint && existingJoint.length) {
      return true;
    }
    
    const joint = await this.db`
            insert into public.user_poi (
                user_id, poi_id
            ) values (
                ${data.user_id},
                ${poi.id}
            )
            
            returning *
        `;
    if(joint && joint.length) return true;

    return false;
  }

  findByAttribute = async (attr: keyof PointOfInterestEntity, value: string) => {
    const result: any[] = await this.db<PointOfInterestEntity[]>`
        select * from public.point_of_interest where ${this.db(attr)} = ${value};
    `

    if(!result.length) return;

    return result.map(i => PointOfInterestSchema.parse({...i, tags:i.tags.split(',')}))
  }

  findForUser = async (userId: string) => {
    const listIds = await this.db`select * from public.user_point_of_interest where user_id = ${userId}`;
    const list = await this.db`select * from public.user_point_of_interest where poi_id in ${this.db(listIds.map((i: any) => i.id))}`
    if(list && list.length) {
      return list.map((i:any) => PointOfInterestSchema.parse({...i, tags: i.tags.split(',')}));
    }
    return []
  }

}
