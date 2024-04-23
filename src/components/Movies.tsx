import { Box, Typography } from "@mui/material";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const Movies = () => {
    const search = useSelector((state: RootState) => state.search);

    return (
        <Box component="main" sx={{ p: 3 }}>
            {[...Array(40)].map((_, i) => <Typography key={i}>MOVIES {search}</Typography>)}
        </Box>
    );
};

export default Movies;
