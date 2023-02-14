export default class Address {

  constructor(initData: Partial<Address>) {
      Object.assign(this, initData);
  }
  
  private id!: string
  private street!: string;
  private city!: string;
  private country!: string;
  private zipcode!: string;

  public get Id(): string {
    return this.id;
  }
  public get Street(): string {
    return this.street;
  }
  public set Street(value: string) {
    this.street = value;
  }
  public get Zipcode(): string {
    return this.zipcode;
  }
  public set Zipcode(value: string) {
    this.zipcode = value;
  }
  public get Country(): string {
    return this.country;
  }
  public set Country(value: string) {
    this.country = value;
  }

  public get City(): string {
    return this.city;
  }
  public set City(value: string) {
    this.city = value;
  }
}


