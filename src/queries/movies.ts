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


export const MOVIE_INFO = gql`
    query getMovies($imdbId: ID!) {
        movieInfo(id: $imdbId) {
            id
            plot
            poster
        }
    }
`;

export const CREATE_MOVIE_FRAGMENT = gql`
    fragment CreateMovieFragment on Movie {
        id
        userId
        title
        year
        notes
        imdbId
        completed
    }
`;

export const CREATE_MOVIE = gql`
    mutation CreateMovie($movieContent: CreateMovieContent!) {
        createMovie(movieContent: $movieContent) {
            ...CreateMovieFragment
        }
    }
    ${CREATE_MOVIE_FRAGMENT}
`;

export const UPDATE_MOVIE_FRAGMENT = gql`
    fragment UpdateMovieFragment on Movie {
        title
        year
        notes
        imdbId
        completed
    }
`;

export const UPDATE_MOVIE = gql`
    mutation UpdateMovie($id: ID!, $movieContent: UpdateMovieContent!) {
        updateMovie(id: $id, movieContent: $movieContent) {
            ...UpdateMovieFragment
        }
    }
    ${UPDATE_MOVIE_FRAGMENT}
`;

export const REMOVE_MOVIE = gql`
    mutation deleteMovie($id: ID!) {
        deleteMovie(id: $id) {
            id
        }
    }
`;
