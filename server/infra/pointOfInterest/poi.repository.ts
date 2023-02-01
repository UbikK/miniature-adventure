import PointOfInterest from "../../domain/pointOfInterest/poi.model.ts";
import IRepository from "../../domain/Repository.interface.ts";
import { PointOfInterestEntity } from "./poi.entity.ts";

export default class PointOfInterestRepository implements IRepository<PointOfInterestEntity, PointOfInterest> {
    getById
    save
    convertToDomain
}