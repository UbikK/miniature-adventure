import { Address, User } from "../../../domain/src/mod.ts"

export type PointOfInterestDto = {
    placeId?: string,
    name?: string,
    address?: Address,
    user?: User,
    photoId?: string,
    addressId?: string,
    userId?: string,
    coordinates?:string,
    tags?: (string|undefined)[]
  }