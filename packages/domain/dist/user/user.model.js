"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor({ email, id, lastname, firstname, googleinfos }) {
        this._email = email;
        this._id = id;
        this._firstName = firstname;
        this._lastName = lastname;
        this._googleInfos = googleinfos;
    }
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
exports.default = User;
