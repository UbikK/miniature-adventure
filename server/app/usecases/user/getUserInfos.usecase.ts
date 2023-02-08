import { IUseCase, IUserAdapter, User } from "domain";

export default class GetUserInfosUseCase implements IUseCase {
    /**
     *
     */
    constructor(private userAdapter: IUserAdapter) {}
    execute: (data?: any) => Promise<User | undefined> = (email) => {
        return this.userAdapter.getUserInfos(email);
    };

} 