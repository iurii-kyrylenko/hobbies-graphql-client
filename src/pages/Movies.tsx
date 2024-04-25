import { Box } from "@mui/material";
import { gql } from "@apollo/client";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import Query from "../components/Query";

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
    const search = useSelector((state: RootState) => state.search);
    const userId = useSelector((state: RootState) => state.userId);

    return (
        <Box component="main" sx={{ p: 3 }}>
            <Query query={GET_MOVIES} variables={{ userId, search }} />
        </Box>
    );
};

export default Movies;
