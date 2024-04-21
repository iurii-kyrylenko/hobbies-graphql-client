import { Box, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const Books = () => {
    const search = useOutletContext<string>();

    return (
        <Box component="main" sx={{ p: 3 }}>
            {[...Array(40)].map((_, i) => <Typography key={i}>BOOKS {search}</Typography>)}
        </Box>
    );
};

export default Books;
