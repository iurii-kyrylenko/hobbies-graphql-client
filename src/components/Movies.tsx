import { Box, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const Movies = () => {
    const search = useOutletContext<string>();

    return (
        <Box component="main" sx={{ p: 3 }}>
            {[...Array(40)].map((_, i) => <Typography key={i}>MOVIES {search}</Typography>)}
        </Box>
    );
};

export default Movies;
