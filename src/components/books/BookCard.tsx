import { CardContent } from "@mui/material";
import { Book } from "../../types";

const BookCard = ({ author, title, mode, completed }: Book) => {
    return (
        <CardContent>
            <pre style={{ whiteSpace: "pre-wrap" }}>
                {JSON.stringify({ author, title, mode, completed }, null, 2)}
            </pre>
        </CardContent>
    );
};

export default BookCard;
