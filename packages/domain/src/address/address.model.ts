export default class Address {
  /** */
  constructor({ street, zipcode, city, country }: {street: string, zipcode: string, city: string, country: string}) {
    this._street = street;
    this._zipcode = zipcode;
    this._city = city;
    this._country = country;
  }
  private _street: string;
  private _city: string;
  private _country: string;
  private _zipcode: string;

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

  public get dto() {
    return {
      street: this.street,
      zipcode: this.zipcode,
      city: this.city,
      country: this.country
    }
  }
}

export type AddressDto = {
  street: string,
  zipcode: string,
  city: string,
  country: string
}
