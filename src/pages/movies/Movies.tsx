import { Box } from "@mui/material";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { queryItemsSelector } from "../../store/app-slice";
import { GET_MOVIES } from "../../queries/movies";

interface Vars {
    userId: string;
    search: string;
}

interface Data {
    movies: any[];
}

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
