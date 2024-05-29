import { playlist } from "./playlist.types";
import { reviews } from "./reviews.types";

export interface user {
    User_Name: String,
    User_Password: String,
    Profile_Picture_Link: String,
    User_Playlist: playlist,
    User_Reviews: reviews,
    Creation_Date: Date
}