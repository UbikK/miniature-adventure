import sql from "../../../infra/database/connection.ts";
import UserAdapter from "../../../infra/user/user.adapter.ts";
import UserRepository from "../../../infra/user/user.repository.ts";
import SignUpUseCase from "../../usecases/user/signup.usecase.ts";

export default class SignUpController extends SignUpUseCase{
    constructor() {
        super(new UserAdapter(new UserRepository(sql)));
    }
}