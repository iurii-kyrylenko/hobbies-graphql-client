import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Book } from "../../types";

const BookCard = ({ author, title, mode, completed }: Book) => {
    return (
        <CardContent>
            <Box sx={{ overflowY: "auto"}}>
                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{title}</Typography>
            </Box>
            <Typography sx={{ fontSize: 13, color: "#1565c0" }}>by {author}</Typography>
            <Typography sx={{ fontSize: 12 }} color="text.secondary">
                {mode} | Read on {completed?.substring(0, 10)}
            </Typography>
        </CardContent>
    );
};

export default BookCard;
