import { PointOfInterestDto } from "../mod";

export type IInformationService = {
    getPredictions: (input: string, coords: string) => Promise<PointOfInterestDto[]>
}
