import { Box, Typography } from "@mui/material";

const Home = () => {
    return (
        <Box component="main" sx={{ p: 3 }}>
            {[...Array(40)].map((_, i) => <Typography key={i}>HOME 0123456789 HOME 0123456789</Typography>)}
        </Box>
    );
};

export default Home;
