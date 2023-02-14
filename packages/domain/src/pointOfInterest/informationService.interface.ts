import PointOfInterest from "./poi.model.ts"

export type IInformationService = {
    getPredictions: (input: string, coords: string) => Promise<PointOfInterest[]>
}
