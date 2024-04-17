import { Box, Typography } from "@mui/material";

const MyContent = () => {
    return (
        <Box component="main" sx={{ p: 3 }}>
            {[...Array(40)].map((_, i) => <Typography key={i}>CONTENT 0123456789 CONTENT 0123456789</Typography>)}
        </Box>
    );
};

export default MyContent;
