import { Box, Typography } from "@mui/material";

const Movies = () => {
    return (
        <Box component="main" sx={{ p: 3 }}>
            {[...Array(40)].map((_, i) => <Typography key={i}>MOVIES 0123456789 MOVIES 0123456789</Typography>)}
        </Box>
    );
};

export default Movies;
