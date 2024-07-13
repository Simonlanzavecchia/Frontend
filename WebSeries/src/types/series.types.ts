import { reviews } from "./reviews.types";

export interface serie {
    _id: string,
    Poster_Link: String, 
    Series_Title: String,
    Runtime_of_Series: String,
    Certificate: String,
    Runtime_of_Episodes: String,
    Genre: String,
    IMDB_Rating: Number,
    Overview: String,
    Star1: String,
    Star2: String,
    Star3: String,
    Star4: String,
    No_of_Votes: Number,
    Series_Reviews: reviews[]
}