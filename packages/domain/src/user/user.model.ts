export default class User {
    constructor({email, id, lastname, firstname, googleinfos}: {email?: string, lastname?: string, firstname?: string, id?: string, googleinfos?: any |undefined}){
        this._email = email;
        this._id = id;
        this._firstName = firstname;
        this._lastName = lastname;
        this._googleInfos = googleinfos
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