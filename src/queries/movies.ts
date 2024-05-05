import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
    query getMovies($userId: ID!) {
        movies(userId: $userId) {
            id
            title
            year
            notes
            completed
            imdbId
        }
    }
`;


export const REMOVE_MOVIE = gql`
    mutation deleteMovie($id: ID!) {
        deleteMovie(id: $id) {
            id
        }
    }
`;
