import { Box } from "@mui/material";
import { gql } from "@apollo/client";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import Query from "../components/Query";

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
    const search = useSelector((state: RootState) => state.search);
    const userId = useSelector((state: RootState) => state.userId);

    return (
        <Box component="main" sx={{ p: 3 }}>
            <Query query={GET_BOOKS} variables={{ userId, search }} />
        </Box>
    );
};

export default Books;
