import { BodyJson, Router } from "oak";
import SignInController from "./signInController.ts";
import SignUpController from "./signUpController.ts";

const userRouter = new Router({prefix:'/users'});

type Body = {
    email: string;
    password: string;
}

userRouter.post('/signup', async (ctx) => {
    const {value}: BodyJson = ctx.request.body({type: 'json'});

    const body: Body = await value;

    new SignUpController().execute(body);
    return;
})

userRouter.get('/:email', async (ctx) => {
    const email = ctx.params.email;

    return new SignInController().execute({email})
})

export default userRouter;