import { gql } from "@apollo/client";

export const LOGIN = gql`
    query login($name: String!, $password: String!) {
        login(name: $name, password: $password)
    }
`;

export const REGISTER = gql`
    mutation register($captchaToken: String!, $registerData: RegisterData!) {
        register(captchaToken: $captchaToken, registerData: $registerData)
    }
`;

export const GET_USER = gql`
    query getUser($id: ID!) {
        user(id: $id) {
            id
            shareBooks
            shareMovies
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($id: ID!, $settings: SettingsData!) {
        updateUser(id: $id, settings: $settings) {
            id
        }
    }
`;

export const GET_PEOPLE = gql`
    query getPeople {
        people {
            id
            name
            shareBooks
            shareMovies
            books
            movies
            total
        }
    }
`;
