import { PointOfInterestDto } from "./poi.model.ts"

export type IInformationService = {
    getPredictions: (input: string, coords: string) => Promise<PointOfInterestDto[]>
}
