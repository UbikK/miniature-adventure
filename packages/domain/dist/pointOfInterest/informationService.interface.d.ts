import { PointOfInterestDto } from "./poi.model.ts";
export declare type IInformationService = {
    getPredictions: (input: string, coords: string) => Promise<PointOfInterestDto[]>;
};
