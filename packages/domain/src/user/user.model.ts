export default class User {
    constructor(initData: any){
        this._email = initData.email;
        this._id = initData.id;
        this._firstName = initData.firstName;
        this._lastName = initData.lastName;
        this._googleInfos = initData.googleInfos
    }

    private _id?: string
    private _lastName?: string | undefined;
    private _firstName?: string | undefined;
    private _email?: string | undefined;
    private _googleInfos?: any | undefined;
  
  
    public get googleInfos(): any | undefined {
        return this._googleInfos;
    }

    public set googleInfos(value: any | undefined) {
        this._googleInfos = value;
    }
  
    
    public get id() {
        return this._id
    }

    public get lastName(): string | undefined {
        return this._lastName;
    }
    public set lastName(value: string | undefined) {
        this._lastName = value;
    }

    public get email(): string | undefined {
        return this._email;
    }

    public get firstName(): string | undefined {
        return this._firstName;
    }
    public set firstName(value: string | undefined) {
        this._firstName = value;
    }

}