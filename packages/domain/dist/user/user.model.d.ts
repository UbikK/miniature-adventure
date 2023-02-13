export default class User {
    constructor({ email, id, lastname, firstname, googleinfos }: {
        email?: string;
        lastname?: string;
        firstname?: string;
        id?: string;
        googleinfos?: any | undefined;
    });
    private _id?;
    private _lastName?;
    private _firstName?;
    private _email?;
    private _googleInfos?;
    get googleInfos(): any | undefined;
    set googleInfos(value: any | undefined);
    get id(): string | undefined;
    get lastName(): string | undefined;
    set lastName(value: string | undefined);
    get email(): string | undefined;
    get firstName(): string | undefined;
    set firstName(value: string | undefined);
    get dto(): UserDto;
}
export type UserDto = {
    id?: string;
    lastName?: string;
    firstName?: string;
    email?: string;
    googleInfos?: any;
};
