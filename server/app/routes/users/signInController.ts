import sql from "../../../infra/database/connection.ts";
import UserAdapter from "../../../infra/user/user.adapter.ts";
import UserRepository from "../../../infra/user/user.repository.ts";
import SignInUseCase from "../../usecases/user/signin.usecase.ts";

export default class SignInController extends SignInUseCase{
    constructor() {
        super(new UserAdapter(new UserRepository(sql)));
    }
}