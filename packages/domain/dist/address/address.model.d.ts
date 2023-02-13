export default class Address {
    constructor(initData: Partial<Address>);
    private _street;
    private _city;
    private _country;
    private _zipcode;
    get street(): string;
    set street(value: string);
    get zipcode(): string;
    set zipcode(value: string);
    get country(): string;
    set country(value: string);
    get city(): string;
    set city(value: string);
    get dto(): {
        street: string;
        zipcode: string;
        city: string;
        country: string;
    };
}
export type AddressDto = {
    street: string;
    zipcode: string;
    city: string;
    country: string;
};
