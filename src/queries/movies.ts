import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
    query getMovies($userId: ID!, $search: String) {
        movies(userId: $userId, search: $search) {
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
