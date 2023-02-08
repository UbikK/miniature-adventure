import { BodyJson, Router } from "oak";
import sql from "../../../infra/database/connection.ts";
import UserAdapter from "../../../infra/user/user.adapter.ts";
import UserRepository from "../../../infra/user/user.repository.ts";
import GetUserInfosUseCase from "../../usecases/user/getUserInfos.usecase.ts";
import SignUpController from "./signUpController.ts";

const userRouter = new Router();

type Body = {
    email: string;
    password: string;
}

userRouter.post('/', async (ctx) => {
    const {value}: BodyJson = ctx.request.body({type: 'json'});

    const body: Body = await value;
    const user = await new SignUpController().execute(body);
    ctx.response.body = user;
})

userRouter.get('/:email', async (ctx) => {
    const email = ctx.params.email;
    const user = await new GetUserInfosUseCase(new UserAdapter(new UserRepository(sql))).execute(email);
    ctx.response.body = user?.dto
})

export default userRouter;