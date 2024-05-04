import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Book } from "../../types";

const BookCard = ({ author, title, mode, completed }: Book) => {
    return (
        <CardContent>
            <Typography sx={{ fontSize: 18 }}>{title}</Typography>
            <p />
           <Typography sx={{ fontSize: 16 }} color="Highlight">by {author}</Typography>
            <p />
            <Typography sx={{ fontSize: 14 }} color="text.secondary">{mode} | {completed?.substring(0,10)}</Typography>
        </CardContent>
    );
};

export default BookCard;
