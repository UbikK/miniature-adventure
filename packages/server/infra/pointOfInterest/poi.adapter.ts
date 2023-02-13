
import { Address, IPointOfInterestAdapter, PointOfInterest, PointOfInterestDto, User } from "domain";
import { AddressEntity } from "../address/address.entity.ts";
import AddressRepository from "../address/address.repository.ts";
import UserRepository from '../user/user.repository.ts';
import GoogleService from "./google.service.ts";
import { PointOfInterestEntity } from "./poi.entity.ts";
import PointOfInterestRepository from "./poi.repository.ts";

export default class PointOfInterestAdapter implements IPointOfInterestAdapter {
  constructor (private repo: PointOfInterestRepository, private addressRepo: AddressRepository, private userRepo: UserRepository, private infoService: GoogleService) {  }

  registerPointOfInterestForUser = async (data:PointOfInterestDto) => {
    const addressInfos = data.address!;
    let existingAddress: AddressEntity | undefined = await this.addressRepo.findOne(addressInfos);

    if (!existingAddress) {
      existingAddress = await this.addressRepo.save(addressInfos);
    }

    const isSaved = await this.repo.save({
      name: data.name!, 
      coordinates: data.coordinates!, 
      place_id: data.place_id!, 
      address_id: existingAddress.id!, 
      user_id: data.userId!,
      photo_id: data.photo_id!,
      tags: data.tags,
    });

    
    return isSaved;
  };

  getPredictions = (input: string, coords: string) => {
    const list = this.infoService.getPredictions(input, coords);
    console.info(list)
    return list;
  }

  getPointsOfInterestForUser: (userId: string) => Promise<PointOfInterestDto[]> = async (userId) => {
    const results = await this.repo.findForUser(userId);

    if(!results) return [];
    const list =  await Promise.all(results.map(async (entity: PointOfInterestEntity) => {
      const point = new PointOfInterest(entity);

      point.setAddress(new Address(await this.addressRepo.findById(entity.address_id)));
      point.setUser(new User(await this.userRepo.findById(entity.user_id)));

      return point;
    }));

    return list.map(i => i.dto);
  };
}
