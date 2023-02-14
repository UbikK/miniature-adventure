import { IRepository, PointOfInterest } from "@domain";
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
    const existingPoi = await this.findByAttribute('placeId', data.placeId);

    if(existingPoi) {
      poi = existingPoi[0];
    } else {
      const result = await this.db`
      insert into public.point_of_interest (
          place_id, coordinates, address_id, photo_id, name, tags
      ) values (
          ${data.placeId},
          ${data.coordinates}, 
          ${data.addressId}, 
          ${data.photoId}, 
          ${data.name}, 
          ${data.tags}
      )
      
      returning *
  `;

      poi = PointOfInterestSchema.parse({...result[0], tags: result[0].tags.split(',')});
    }
    
    return poi;
    
  }

  registerPoiForUser = async ({placeId, userId}:{placeId: string, userId: string}) => {
    const existingJoint = await this.db`select * from public.user_poi where user_id = ${userId} and poi_id = ${placeId}`;

    if (existingJoint && existingJoint.length) {
      return true;
    }
    
    const joint = await this.db`
            insert into public.user_poi (
                user_id, poi_id
            ) values (
                ${userId},
                ${placeId}
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
    const list = await this.db`select * from public.point_of_interest where id in (${this.db`select poi_id from public.user_poi where user_id = ${userId}`})`;
    if(list && list.length) {
      return list.map((i:any) => PointOfInterestSchema.parse(i));
    }
    return []
  }

}
