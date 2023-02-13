
import { Address, IPointOfInterestAdapter, PointOfInterest, User } from "@domain";
import { AddressEntity } from "../address/address.entity.ts";
import AddressRepository from "../address/address.repository.ts";
import UserRepository from '../user/user.repository.ts';
import GoogleService from "./google.service.ts";
import { PointOfInterestDto } from "./poi.dto.ts";
import { PointOfInterestEntity } from "./poi.entity.ts";
import PointOfInterestRepository from "./poi.repository.ts";

export default class PointOfInterestAdapter implements IPointOfInterestAdapter {
  constructor (private repo: PointOfInterestRepository, private addressRepo: AddressRepository, private userRepo: UserRepository, private infoService: GoogleService) {  }
  toDto: (model: PointOfInterest) => PointOfInterestDto = (model) => {
    return {
      place_id: model.place_id,
      name: model.name,
      photo_id: model.photo_id,
      addressId: model.address?.id,
      userId: model.user.id,
      coordinates: model.coordinates,
      tags: model.tags
    }
  };

  registerPointOfInterestForUser = async (data:PointOfInterest) => {
    console.info('register data', data)
    const addressInfos = data.address!;
    let existingAddress: AddressEntity | undefined = await this.addressRepo.findOne(addressInfos);

    if (!existingAddress) {
      existingAddress = await this.addressRepo.save(addressInfos);
    }

    const pois = await this.repo.findByAttribute('place_id', data.place_id!);
    let existingPoi = pois && pois[0];
    if(!existingPoi) {
      existingPoi = await this.repo.save({
        name: data.name!, 
        coordinates: data.coordinates!, 
        place_id: data.place_id!, 
        address_id: existingAddress.id!, 
        photo_id: data.photo_id!,
        tags: data.tags,
      });
    }

    const isSaved = this.repo.registerPoiForUser({placeId:existingPoi.id!, userId:data.user.id!})
    
    return isSaved;
  };

  getPredictions = (input: string, coords: string) => {
    return this.infoService.getPredictions(input, coords);
  }

  getPointsOfInterestForUser: (userId: string) => Promise<PointOfInterest[]> = async (userId) => {
    console.info('adapter', userId)
    const results = await this.repo.findForUser(userId);

    if(!results) return [];
    const list =  await Promise.all(results.map(async (entity: PointOfInterestEntity) => {
      const point = new PointOfInterest(entity);

      point.setAddress(new Address(await this.addressRepo.findById(entity.address_id)));
      point.setUser(new User(await this.userRepo.findById(userId)));

      return point;
    }));

    return list;
  };
}
