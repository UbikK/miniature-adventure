"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    /** */
    constructor({ street, zipcode, city, country }) {
        this._street = street;
        this._zipcode = zipcode;
        this._city = city;
        this._country = country;
    }
    get street() {
        return this._street;
    }
    set street(value) {
        this._street = value;
    }
    get zipcode() {
        return this._zipcode;
    }
    set zipcode(value) {
        this._zipcode = value;
    }
    get country() {
        return this._country;
    }
    set country(value) {
        this._country = value;
    }
    get city() {
        return this._city;
    }
    set city(value) {
        this._city = value;
    }
    get dto() {
        return {
            street: this.street,
            zipcode: this.zipcode,
            city: this.city,
            country: this.country
        };
    }
}
exports.default = Address;
