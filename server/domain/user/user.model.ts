export default class User {
    constructor({email, id, lastName, firstName, googleInfos}: {email: string, lastName?: string, firstName?: string, id?: string, googleInfos?: any |undefined}){
        this._email = email;
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._googleInfos = googleInfos
    }

    private _id?: string
    private _lastName?: string | undefined;
    private _firstName?: string | undefined;
    private _email?: string | undefined;
    private _googleInfos?: any | undefined;
  public get googleInfos_1(): any | undefined {
    return this._googleInfos;
  }
  public set googleInfos_1(value: any | undefined) {
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