import AddressRepository from "../../../infra/address/address.repository.ts";
import { default as sql } from "../../../infra/database/connection.ts";
import GoogleService from "../../../infra/pointOfInterest/google.service.ts";
import PointOfInterestAdapter from "../../../infra/pointOfInterest/poi.adapter.ts";
import PointOfInterestRepository from "../../../infra/pointOfInterest/poi.repository.ts";
import UserRepository from "../../../infra/user/user.repository.ts";
import AddPointOfInterestUseCase from "../../usecases/pointOfInterest/add.usecase.ts";

export default class AddPointOfInterestController extends AddPointOfInterestUseCase{
    /**
     *
     */
    constructor() {
        super(new PointOfInterestAdapter(
            new PointOfInterestRepository(sql),
            new AddressRepository(sql),
            new UserRepository(sql),
            new GoogleService()
        ));
    }

}