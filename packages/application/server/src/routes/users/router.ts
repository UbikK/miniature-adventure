import sql from "@infra/database/connection.ts";
import UserAdapter from "@infra/user/user.adapter.ts";
import UserRepository from "@infra/user/user.repository.ts";
import { HttpError, Router } from "oak";
import GetUserInfosUseCase from "../../usecases/user/getUserInfos.usecase.ts";
import SignUpUseCase from "../../usecases/user/signup.usecase.ts";

const adapter = new UserAdapter(new UserRepository(sql));
const router = new Router();

router.post('/', async (ctx) => {            
    const body = await ctx.request.body({type: 'json'}).value;
    const user = await new SignUpUseCase(adapter).execute(body);
    ctx.response.body = user;
});

router.get('/:email', async (ctx) => {
    const email = ctx.params.email;
    const user = await new GetUserInfosUseCase(adapter).execute(email);
    if(!user) {
        ctx.response.status = 404;
        ctx.response.body = new HttpError('User not found');
        return;
    }
    ctx.response.status = 200;
    console.info(adapter.toDto(user))
    ctx.response.body = adapter.toDto(user);
})

export default router;