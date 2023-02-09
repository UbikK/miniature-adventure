import Address, { AddressDto } from "../address/address.model";
import User, { UserDto } from "../user/user.model";

export default class PointOfInterest {
  constructor(
    { place_id, coordinates, photo_id, name, addressId, address, userId, user }: {
      place_id?: string;
      coordinates?: string;
      photo_id?: string;
      name?: string;
      addressId?: string; 
      address?: Address; 
      userId?: string;
      user?: User;
    },
  ) {
    this._place_id = place_id;
    this._coordinates = coordinates;
    this._photo_id = photo_id;
    this._name = name;    
    this._addressId = addressId;
    this._userId = userId;

    if(address) this._address = new Address(address);
    if(user) this._user = new User(user);
  }

  //private _id?: string;
  private _place_id?: string | undefined;
  private _coordinates?: string | undefined;
  private _address!: Address;
  private _photo_id?: string | undefined;
  private _name?: string | undefined;
  private _user!: User;
  private _addressId?: string | undefined;
  private _userId?: string | undefined;

  setAddress = (addr: Address) => {
    this._address = addr;
  };

  setUser = (user: User) => {
    this._user = user;
  }

  public get address(): Address | undefined {
    return this._address;
  }

  public get user_id(): string | undefined {
    return this._userId;
  }
  public get address_id(): string | undefined {
    return this._addressId;
  }
  public get photo_id(): string {
    return this._photo_id!;
  }
  public set photo_id(id: string) {
    this._photo_id = id;
  }
  public get coordinates(): string | undefined {
    return this._coordinates;
  }
  public get place_id(): string | undefined {
    return this._place_id;
  } 
  public get name(): string | undefined {
    return this._name;
  }

  public get user() {
    return this._user;
  }

  public get dto(): PointOfInterestDto {
    return {
      place_id: this.place_id,
      name: this.name,
      address: this.address?.dto,
      user: this.user,
      photo_id: this.photo_id,
      addressId: this.address_id,
      userId: this.user_id,
      coordinates: this.coordinates
    }
  }
}

export type PointOfInterestDto = {
  place_id?: string,
  name?: string,
  address?: AddressDto,
  user?: UserDto,
  photo_id?: string,
  addressId?: string,
  userId?: string,
  coordinates?:string
}