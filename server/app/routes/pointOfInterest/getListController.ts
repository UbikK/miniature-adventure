import AddressRepository from "../../../infra/address/address.repository.ts";
import sql from "../../../infra/database/connection.ts";
import GoogleService from "../../../infra/pointOfInterest/google.service.ts";
import PointOfInterestAdapter from "../../../infra/pointOfInterest/poi.adapter.ts";
import PointOfInterestRepository from "../../../infra/pointOfInterest/poi.repository.ts";
import UserRepository from "../../../infra/user/user.repository.ts";
import GetListPointOfInterestUseCase from "../../usecases/pointOfInterest/getList.usecase.ts";

export default class GetListPointOfInterestController extends GetListPointOfInterestUseCase{
    constructor() {
        super(new PointOfInterestAdapter(
            new PointOfInterestRepository(sql),
            new AddressRepository(sql),
            new UserRepository(sql),
            new GoogleService()
        ));
    }
}