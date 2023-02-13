import Address, { AddressDto } from "../address/address.model.ts";
import User, { UserDto } from "../user/user.model.ts";
export default class PointOfInterest {
    constructor({ place_id, coordinates, photo_id, name, addressId, address, userId, user, tags }: {
        place_id?: string;
        coordinates?: string;
        photo_id?: string;
        name?: string;
        addressId?: string;
        address?: Address;
        userId?: string;
        user?: User;
        tags?: string[];
    });
    private _place_id?;
    private _coordinates?;
    private _address;
    private _photo_id?;
    private _name?;
    private _user;
    private _addressId?;
    private _userId?;
    private _tags?;
    setAddress: (addr: Address) => void;
    setUser: (user: User) => void;
    get address(): Address | undefined;
    get user_id(): string | undefined;
    get address_id(): string | undefined;
    get photo_id(): string;
    set photo_id(id: string);
    get coordinates(): string | undefined;
    get place_id(): string | undefined;
    get name(): string | undefined;
    get user(): User;
    get tags(): string[];
    set tags(tags: string[]);
    get dto(): PointOfInterestDto;
}
export type PointOfInterestDto = {
    place_id?: string;
    name?: string;
    address?: AddressDto;
    user?: UserDto;
    photo_id?: string;
    addressId?: string;
    userId?: string;
    coordinates?: string;
    tags?: string[];
};
