import { AddressDto } from "../address/address.dto.ts"
import { UserDto } from "../user/user.dto.ts"

export type PointOfInterestDto = {
    place_id?: string,
    name?: string,
    address?: AddressDto,
    user?: UserDto,
    photo_id?: string,
    addressId?: string,
    userId?: string,
    coordinates?:string,
    tags?: string[]
  }