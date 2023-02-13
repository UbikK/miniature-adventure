import AddressRepository from "@infra/address/address.repository.ts";
import sql from "@infra/database/connection.ts";
import GoogleService from "@infra/pointOfInterest/google.service.ts";
import PointOfInterestAdapter from "@infra/pointOfInterest/poi.adapter.ts";
import PointOfInterestRepository from "@infra/pointOfInterest/poi.repository.ts";
import UserRepository from "@infra/user/user.repository.ts";
import { Router } from "oak";
import AddPointOfInterestUseCase from "../../usecases/pointOfInterest/add.usecase.ts";
import GetListPointOfInterestUseCase from "../../usecases/pointOfInterest/getList.usecase.ts";
import GetPredictionsUseCase from "../../usecases/pointOfInterest/getPredictions.usecase.ts";

const adapter = new PointOfInterestAdapter(
    new PointOfInterestRepository(sql),
    new AddressRepository(sql),
    new UserRepository(sql),
    new GoogleService()
)
const router = new Router();
router.post('/', async (ctx) => {
    const body = await ctx.request.body({type: 'json'}).value;
    console.info(body)
    const place = new AddPointOfInterestUseCase(adapter).execute(body);
    ctx.response.body = place
});

router.post('/get-predictions', async (ctx) => {
    const predictionList = await new GetPredictionsUseCase(adapter).execute(await ctx.request.body().value)
    console.info(predictionList)
    ctx.response.body = predictionList;
});

router.get('/user/:id', async (ctx) => {
    const userId = ctx.params.id;

    const list = await new GetListPointOfInterestUseCase(adapter).execute(userId);

    ctx.response.body = list;
});
export default router;

