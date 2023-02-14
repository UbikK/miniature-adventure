import { Router } from "oak";
import poiRouter from "./pointOfInterest/router.ts";
import userRouter from "./users/router.ts";

const globalRouter = new Router();

globalRouter.use('/users', userRouter.routes(), userRouter.allowedMethods())
globalRouter.use('/poi', poiRouter.routes(), poiRouter.allowedMethods())

export default globalRouter;