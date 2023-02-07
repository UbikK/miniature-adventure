import { Router } from "oak";
import AddressRepository from "../../../infra/address/address.repository.ts";
import sql from "../../../infra/database/connection.ts";
import GoogleService from "../../../infra/pointOfInterest/google.service.ts";
import PointOfInterestAdapter from "../../../infra/pointOfInterest/poi.adapter.ts";
import PointOfInterestRepository from "../../../infra/pointOfInterest/poi.repository.ts";
import UserRepository from "../../../infra/user/user.repository.ts";
import GetListPointOfInterestUseCase from "../../usecases/pointOfInterest/getList.usecase.ts";
import AddPointOfInterestController from "./addController.ts";

const poiRouter = new Router();

poiRouter.post('/', async (ctx) => {
    const body = await ctx.request.body({type: 'json'}).value;
    const place = new AddPointOfInterestController().execute(body);
    ctx.response.body = place
});

poiRouter.get('/user/:id', async (ctx) => {
    const userId = ctx.params.id;
    const list = new GetListPointOfInterestUseCase(
        new PointOfInterestAdapter(
            new PointOfInterestRepository(sql),
            new AddressRepository(sql),
            new UserRepository(sql),
            new GoogleService()
        )
    ).execute(userId);
    ctx.response.body = list;
});

export default poiRouter;
