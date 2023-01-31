import { BodyJson, Router } from "oak";
import SignInController from "./signInController.ts";
import SignUpController from "./signUpController.ts";

const userRouter = new Router({prefix:'/users'});

type Body = {
    email: string;
    password: string;
}

userRouter.post('/', async (ctx) => {
    console.info('hello post')
    const {value}: BodyJson = ctx.request.body({type: 'json'});

    const body: Body = await value;
    const user = await new SignUpController().execute(body);
    console.info('user', user)
    return user;
})

userRouter.get('/:email', async (ctx) => {
    const email = ctx.params.email;

    return new SignInController().execute({email})
})

export default userRouter;