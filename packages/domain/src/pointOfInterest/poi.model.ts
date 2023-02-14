import Address from "../address/address.model.ts";
import User from "../user/user.model.ts";

export default class PointOfInterest {
  constructor(initData: Partial<PointOfInterest>) {
    Object.assign(this, initData)
  }

  private placeId?: string | undefined;
  private coordinates?: string | undefined;
  private address!: Address;
  private photoId?: string | undefined;
  private name?: string | undefined;
  private user!: User;
  private addressId?: string | undefined;
  private userId?: string | undefined;
  private tags?: (string|undefined)[] | undefined

  public get Address(): Address {
    return this.address;
  }

  public get UserId(): string | undefined {
    return this.userId;
  }
  public get AddressId(): string | undefined {
    return this.addressId;
  }
  public get PhotoId(): string {
    return this.photoId!;
  }
  public set PhotoId(id: string) {
    this.photoId = id;
  }
  public get Coordinates(): string | undefined {
    return this.coordinates;
  }
  public get PlaceId(): string | undefined {
    return this.placeId;
  } 
  public get Name(): string | undefined {
    return this.name;
  }

  public get User() {
    return this.user;
  }

  public get Tags() : (string|undefined)[]{
    return this.tags ?? [];
  }

  public set Tags(tags: (string|undefined)[]) {
    this.tags = tags;
  }

  public set PlaceId(value: string | undefined) {
    this.placeId = value;
  }
  public set Coordinates(value: string | undefined) {
    this.coordinates = value;
  }

  public set Name(value: string | undefined) {
    this.name = value;
  }
  public set User(value: User) {
    this.user = value;
  }
 
  public set Address(value: Address) {
    this.address = value;
  }
}

