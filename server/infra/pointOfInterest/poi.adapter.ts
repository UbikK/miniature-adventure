import Address from "../../domain/address/address.model.ts";
import PointOfInterest from "../../domain/pointOfInterest/poi.model.ts";
import IPointOfInterestAdapter from "../../domain/pointOfInterest/poiAdapter.interface.ts";
import User from "../../domain/user/user.model.ts";
import { AddressEntity } from "../address/address.entity.ts";
import AddressRepository from "../address/address.repository.ts";
import UserRepository from '../user/user.repository.ts';
import GoogleService from "./google.service.ts";
import { PointOfInterestEntity } from "./poi.entity.ts";
import PointOfInterestRepository from "./poi.repository.ts";

export default class PointOfInterestAdapter implements IPointOfInterestAdapter {
  constructor (private repo: PointOfInterestRepository, private addressRepo: AddressRepository, private userRepo: UserRepository, private infoService: GoogleService) {  }

  registerPointOfInterestForUser: (data: PointOfInterestEntity) => Promise<PointOfInterest> = async (data) => {
    const addressInfos = await this.infoService.getPointOfInterestInformations(data.place_id!);

    let existingAddress: AddressEntity | undefined = await this.addressRepo.findOne(addressInfos);

    if (!existingAddress) {
      existingAddress = await this.addressRepo.save(addressInfos);
    }

    const pointEntity: PointOfInterestEntity = await this.repo.save({...data, address_id: existingAddress.id!, user_id: data.user_id!});

    const point = new PointOfInterest(pointEntity);

    point.setAddress(new Address(existingAddress));
    point.setUser(new User(await this.userRepo.findById(data.user_id)));
    return point;

  };

  getPointsOfInterestForUser: (userId: string) => Promise<PointOfInterest[]> = async (userId) => {
    const results = await this.repo.findByAttribute('user_id', userId);

    if(!results) return [];
    const list =  await Promise.all(results.map(async entity => {
      const point = new PointOfInterest(entity);

      point.setAddress(new Address(await this.addressRepo.findById(entity.address_id)));
      point.setUser(new User(await this.userRepo.findById(entity.user_id)));

      return point;
    }));

    return list;
  };
}
