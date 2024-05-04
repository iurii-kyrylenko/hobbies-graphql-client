import { CardContent } from "@mui/material";
import { Movie } from "../../types";

const BookCard = ({ title, year, notes, imdbId, completed }: Movie) => {
    return (
        <CardContent>
            <pre style={{ whiteSpace: "pre-wrap" }}>
                {JSON.stringify({ title, year, notes, imdbId, completed }, null, 2)}
            </pre>
        </CardContent>
    );
};

export default BookCard;
