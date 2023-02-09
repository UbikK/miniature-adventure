"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_model_1 = __importDefault(require("../address/address.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
class PointOfInterest {
    constructor({ place_id, coordinates, photo_id, name, addressId, address, userId, user }) {
        this.setAddress = (addr) => {
            this._address = addr;
        };
        this.setUser = (user) => {
            this._user = user;
        };
        this._place_id = place_id;
        this._coordinates = coordinates;
        this._photo_id = photo_id;
        this._name = name;
        this._addressId = addressId;
        this._userId = userId;
        if (address)
            this._address = new address_model_1.default(address);
        if (user)
            this._user = new user_model_1.default(user);
    }
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
        var _a;
        return {
            place_id: this.place_id,
            name: this.name,
            address: (_a = this.address) === null || _a === void 0 ? void 0 : _a.dto,
            user: this.user,
            photo_id: this.photo_id,
            addressId: this.address_id,
            userId: this.user_id,
            coordinates: this.coordinates
        };
    }
}
exports.default = PointOfInterest;
