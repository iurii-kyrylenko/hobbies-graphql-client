import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
    query getBooks($userId: ID!) {
        books(userId: $userId) {
            id
            author
            title
            mode
            completed
        }
    }
`;

export const CREATE_BOOK_FRAGMENT = gql`
    fragment CreateFragment on Book {
        id
        userId
        author
        title
        mode
        completed
    }
`;

export const CREATE_BOOK = gql`
    mutation CreateBook($bookContent: CreateBookContent!) {
        createBook(bookContent: $bookContent) {
            ...CreateFragment
        }
    }
    ${CREATE_BOOK_FRAGMENT}
`;

export const UPDATE_BOOK_FRAGMENT = gql`
    fragment UpdateFragment on Book {
        author
        title
        mode
        completed
    }
`;

export const UPDATE_BOOK = gql`
    mutation UpdateBook($id: ID!, $bookContent: UpdateBookContent!) {
        updateBook(id: $id, bookContent: $bookContent) {
            ...UpdateFragment
        }
    }
    ${UPDATE_BOOK_FRAGMENT}
`;

export const REMOVE_BOOK = gql`
    mutation deleteBook($id: ID!) {
        deleteBook(id: $id) {
            id
        }
    }
`;
