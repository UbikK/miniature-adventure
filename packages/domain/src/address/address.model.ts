export default class Address {

  constructor(initData: Partial<Address>) {
      Object.assign(initData, this);
  }
  
  private _id!: string
  private _street!: string;
  private _city!: string;
  private _country!: string;
  private _zipcode!: string;

  public get id(): string {
    return this._id;
  }
  public get street(): string {
    return this._street;
  }
  public set street(value: string) {
    this._street = value;
  }
  public get zipcode(): string {
    return this._zipcode;
  }
  public set zipcode(value: string) {
    this._zipcode = value;
  }
  public get country(): string {
    return this._country;
  }
  public set country(value: string) {
    this._country = value;
  }

  public get city(): string {
    return this._city;
  }
  public set city(value: string) {
    this._city = value;
  }
}


