import { BodyJson, Context, Router } from "oak";
import SignUpController from "./signUpController.ts";

const userRouter = new Router();

type Body = {
    email: string;
    password: string;
}

userRouter.post('/', async (ctx: Context) => {
    const {value}: BodyJson = ctx.request.body({type: 'json'});

    const body: Body = await value;
    const user = await new SignUpController().execute(body);
    ctx.response.body = user;
})

export default userRouter;