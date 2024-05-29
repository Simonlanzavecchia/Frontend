import { user } from "./users.types";
import { serie } from "./series.types";

export interface playlist {
    Playlist_Name: String,
    Cover_Picture: String,
    Description: String,
    Playlist_Owner: user[],
    Series_IDs: serie[],
    Creation_Date: Date
}