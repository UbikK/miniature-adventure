import { IUseCase, IUserAdapter, User } from 'https://raw.githubusercontent.com/UbikK/miniature-adventure/master/packages/domain/src/mod.ts?token=GHSAT0AAAAAAB6SHYPN4UDN7QJQJ2EXW6RYY7E73QQ';

export default class GetUserInfosUseCase implements IUseCase {
    /**
     *
     */
    constructor(private userAdapter: IUserAdapter) {}
    execute: (data?: any) => Promise<User | undefined> = (email) => {
        return this.userAdapter.getUserInfos(email);
    };

} 