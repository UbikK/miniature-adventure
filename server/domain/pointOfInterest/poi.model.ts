import Address from "../address/address.model.ts";
import User from "../user/user.model.ts";

export default class PointOfInterest {
  constructor(
    { place_id, coordinates, photo_id, name }: {
      place_id?: string;
      coordinates?: string;
      photo_id?: string;
      name?: string;
    },
  ) {
    this._place_id = place_id;
    this._coordinates = coordinates;
    this._photo_id = photo_id;
    this._name = name;
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
  public get photo_id(): string | undefined {
    return this._photo_id;
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
}
