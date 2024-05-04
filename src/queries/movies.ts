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
