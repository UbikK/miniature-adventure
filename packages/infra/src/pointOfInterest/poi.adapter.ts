
import { Address, IPointOfInterestAdapter, PointOfInterest } from "@domain";
import { AddressEntity } from "../address/address.entity.ts";
import AddressRepository from "../address/address.repository.ts";
import UserRepository from '../user/user.repository.ts';
import GoogleService from "./google.service.ts";
import { PointOfInterestDto } from "./poi.dto.ts";
import PointOfInterestRepository from "./poi.repository.ts";

export default class PointOfInterestAdapter implements IPointOfInterestAdapter {
  constructor (private repo: PointOfInterestRepository, private addressRepo: AddressRepository, private userRepo: UserRepository, private infoService: GoogleService) {  }
  toDto: (model: PointOfInterest) => PointOfInterestDto = (model) => {
    return {
      placeId: model.PlaceId,
      name: model.Name,
      photoId: model.PhotoId,
      address: model.Address,
      coordinates: model.Coordinates,
      tags: model.Tags
    }
  };

  private mapAddressInfos = (data:PointOfInterest) => {
    return {
      street: data.Address.Street,
      zipcode: data.Address.Zipcode,
      city: data.Address.City,
      country: data.Address.Country
    }
  }

  registerPointOfInterestForUser = async (data:PointOfInterest) => {
    console.info('register data', data)
    const addressInfos = this.mapAddressInfos(data);
    let existingAddress: AddressEntity | undefined = await this.addressRepo.findOne(addressInfos);

    if (!existingAddress) {
      existingAddress = await this.addressRepo.save(addressInfos);
    }

    const pois = await this.repo.findByAttribute('placeId', data.PlaceId!);
    let existingPoi = pois && pois[0];
    if(!existingPoi) {
      existingPoi = await this.repo.save({
        name: data.Name!, 
        coordinates: data.Coordinates!, 
        placeId: data.PlaceId!, 
        addressId: existingAddress.id!, 
        photoId: data.PhotoId!,
        tags: data.Tags,
      });
    }

    const isSaved = this.repo.registerPoiForUser({placeId:existingPoi.id!, userId:data.User.id!})
    
    return isSaved;
  };

  getPredictions = (input: string, coords: string) => {
    return this.infoService.getPredictions(input, coords);
  }

  getPointsOfInterestForUser: (userId: string) => Promise<PointOfInterest[]> = async (userId) => {
    console.info('adapter', userId)
    const results = await this.repo.findForUser(userId);

    if(!results) return [];
    const list =  await Promise.all(results.map(async (entity: any) => {

      const point = new PointOfInterest(entity);

      point.Address = new Address(await this.addressRepo.findById(entity.addressId))

      return point;
    }));
    console.info('list', list)
    return list;
  };
}
