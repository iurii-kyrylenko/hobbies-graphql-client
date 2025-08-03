import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Book } from "../../types";
import { AppDispatch } from "../../store";
import { useQuery } from "@apollo/client";
import { openSnackbar } from "../../store/app-slice";
import { BOOK_INFO } from "../../queries/books";

const BookCard = ({ author, title, mode, completed, googleBookId }: Book) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = () => {
        setExpanded((state) => !state);
    };

    return (
        <CardContent>
            <Box sx={{ mx: 2, mb: 1 }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{title}</Typography>
                <Typography sx={{ fontSize: 13, color: "#1565c0" }}>by {author}</Typography>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    {mode} | Read on {completed?.substring(0, 10)}
                </Typography>
            </Box>
            {author && title && (<Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontSize: 13 }} color="text.secondary">Details...</Typography>
                </AccordionSummary>
                {expanded && (
                    <AccordionDetails>
                        <BookInfo author={author} title={title} googleBookId={googleBookId} />
                    </AccordionDetails>
                )}
            </Accordion>)}
        </CardContent>
    );
};

interface Props {
    author: string;
    title: string;
    googleBookId?: string;
}

interface Data {
    bookInfo: {
        thumbnail: string;
        description: string;
    };
}

const BookInfo = ({ author, title, googleBookId }: Props) => {
    const dispatch: AppDispatch = useDispatch();

    const { data } = useQuery<Data>(BOOK_INFO, {
        variables: { author, title, googleBookId },
        onError(error) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        },
    });
    return (
        <>
            <img src={data?.bookInfo.thumbnail} />
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                {data?.bookInfo.description}
            </Typography>
        </>
    );
};

export default BookCard;
