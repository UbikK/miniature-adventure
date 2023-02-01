export default class PointOfInterest {
    /**
     *
     */
    constructor({id,place_id,coordinates,address,photo_id,name,user}: {id?: string,place_id: string,coordinates: string,address: string,photo_id: string,name: string,user: string,}) {
        this._id = id;
        this._place_id = place_id
        this._coordinates = coordinates
        this._address = address
        this._photo_id = photo_id
        this._name = name
        this._user = user
    }

    private _id?: string
    private _place_id: string
    private _coordinates: string
    private _address: string
    private _photo_id: string
    private _name: string
    private _user: string

    getPoiInfos = () => {
        
    }


}