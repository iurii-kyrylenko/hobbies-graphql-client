import { Box } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { queryItemsSelector } from "../store/app-slice";

interface Vars {
    userId: string;
    search: string;
}

interface Data {
    movies: any[];
}

const GET_MOVIES = gql`
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

const Movies = () => {
    const variables = useSelector(queryItemsSelector);
    const { loading, error, data } = useQuery<Data, Vars>(GET_MOVIES, { variables });

    return (
        <Box component="main" sx={{ p: 3, overflowX: "scroll" }}>
            <pre>{JSON.stringify({ loading, error, data }, null, 2)}</pre>
        </Box>
    );
};

export default Movies;
