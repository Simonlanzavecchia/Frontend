import { user } from "./users.types";
import { serie } from "./series.types";

export interface reviews {
    Review_Title: String,
    Description: String,
    Rating: Number, 
    Review_Owner: user,
    Series_IDS: serie,
    Creation_Date: Date
}