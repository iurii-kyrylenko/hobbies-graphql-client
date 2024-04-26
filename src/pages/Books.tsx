import { Box } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { queryItemsSelector } from "../store/app-slice";

interface Vars {
    userId: string;
    search: string;
}

interface Data {
    books: any[];
}

const GET_BOOKS = gql`
    query getBooks($userId: ID!, $search: String) {
        books(userId: $userId, search: $search) {
            id
            author
            title
            mode
            completed
        }
    }
`;

const Books = () => {
    const variables = useSelector(queryItemsSelector);
    const { loading, error, data } = useQuery<Data, Vars>(GET_BOOKS, { variables });

    return (
        <Box component="main" sx={{ p: 3 }}>
            <pre>{JSON.stringify({ loading, error, data }, null, 2)}</pre>
        </Box>
    );
};

export default Books;
