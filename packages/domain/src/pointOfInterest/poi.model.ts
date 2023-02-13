import Address from "../address/address.model.ts";
import User from "../user/user.model.ts";

export default class PointOfInterest {
  constructor(initData: Partial<PointOfInterest>) {
    Object.assign(initData, this)
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
  private _tags?: string[]

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

  public get tags() : string[]{
    return this._tags ?? [];
  }

  public set tags(tags: string[]) {
    this._tags = tags;
  }
}

