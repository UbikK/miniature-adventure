// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

class Address {
    constructor({ street , zipcode , city , country  }){
        this._street = street;
        this._zipcode = zipcode;
        this._city = city;
        this._country = country;
    }
    _street;
    _city;
    _country;
    _zipcode;
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
class PointOfInterest {
    constructor({ place_id , coordinates , photo_id , name , addressId , address , userId , user  }){
        this._place_id = place_id;
        this._coordinates = coordinates;
        this._photo_id = photo_id;
        this._name = name;
        this._addressId = addressId;
        this._userId = userId;
        if (address) this._address = address;
        if (user) this._user = user;
    }
    _place_id;
    _coordinates;
    _address;
    _photo_id;
    _name;
    _user;
    _addressId;
    _userId;
    setAddress = (addr)=>{
        this._address = addr;
    };
    setUser = (user)=>{
        this._user = user;
    };
    get address() {
        return this._address;
    }
    get user_id() {
        return this._userId;
    }
    get address_id() {
        return this._addressId;
    }
    get photo_id() {
        return this._photo_id;
    }
    set photo_id(id) {
        this._photo_id = id;
    }
    get coordinates() {
        return this._coordinates;
    }
    get place_id() {
        return this._place_id;
    }
    get name() {
        return this._name;
    }
    get user() {
        return this._user;
    }
    get dto() {
        return {
            place_id: this.place_id,
            name: this.name,
            address: this.address?.dto,
            user: this.user,
            photo_id: this.photo_id,
            addressId: this.address_id,
            userId: this.user_id,
            coordinates: this.coordinates
        };
    }
}
class User {
    constructor({ email , id , lastname , firstname , googleinfos  }){
        this._email = email;
        this._id = id;
        this._firstName = firstname;
        this._lastName = lastname;
        this._googleInfos = googleinfos;
    }
    _id;
    _lastName;
    _firstName;
    _email;
    _googleInfos;
    get googleInfos() {
        return this._googleInfos;
    }
    set googleInfos(value) {
        this._googleInfos = value;
    }
    get id() {
        return this._id;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
    get email() {
        return this._email;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }
    get dto() {
        return {
            id: this._id,
            lastName: this._lastName,
            firstName: this._firstName,
            email: this._email,
            googleInfos: this._googleInfos
        };
    }
}
export { User as User, Address as Address, PointOfInterest as PointOfInterest };
