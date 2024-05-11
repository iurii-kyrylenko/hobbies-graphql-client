import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
    query getPeople {
        people {
            id
            name
            books
            movies
            total
        }
    }
`;
