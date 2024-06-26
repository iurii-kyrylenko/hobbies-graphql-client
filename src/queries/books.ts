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

export const BOOK_INFO = gql`
    query getBookInfo($author: String!, $title: String!) {
        bookInfo(author: $author, title: $title) {
            thumbnail
            description
        }
    }
`;

export const CREATE_BOOK_FRAGMENT = gql`
    fragment CreateBookFragment on Book {
        id
        userId
        author
        title
        mode
        completed
    }
`;

export const CREATE_BOOK = gql`
    mutation CreateBook($userId: ID!, $bookContent: BookContent!) {
        createBook(userId: $userId, bookContent: $bookContent) {
            ...CreateBookFragment
        }
    }
    ${CREATE_BOOK_FRAGMENT}
`;

export const UPDATE_BOOK_FRAGMENT = gql`
    fragment UpdateBookFragment on Book {
        author
        title
        mode
        completed
    }
`;

export const UPDATE_BOOK = gql`
    mutation UpdateBook($id: ID!, $userId: ID!, $bookContent: BookContent!) {
        updateBook(id: $id, userId: $userId, bookContent: $bookContent) {
            ...UpdateBookFragment
        }
    }
    ${UPDATE_BOOK_FRAGMENT}
`;

export const REMOVE_BOOK = gql`
    mutation deleteBook($id: ID!, $userId: ID!) {
        deleteBook(id: $id, userId: $userId) {
            id
        }
    }
`;
