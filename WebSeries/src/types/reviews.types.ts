import { user } from "./users.types";
import { serie } from "./series.types";

export interface reviews {
    Review_Title: String,
    Description: String,
    Rating: Number, 
    Review_Owner: string,
    Series_IDS: string,
    Creation_Date: Date
}