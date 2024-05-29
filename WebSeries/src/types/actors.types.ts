import { serie } from "./series.types"

export interface actor {
    Actor_Name: String,
    Biography: String,
    Photo_Link: String,
    Series_IDs: serie[],      
    Birthday: String
}