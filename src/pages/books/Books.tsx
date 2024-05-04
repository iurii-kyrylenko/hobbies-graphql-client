import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { openSnackbar, queryItemsSelector } from "../../store/app-slice";
import { useInfiniteScroll } from "../../hooks/use-infinite-scroll";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useSearch } from "../../hooks/use-search";
import { GET_BOOKS, REMOVE_BOOK } from "../../queries/books";
import BookCard from "../../components/books/BookCard";
import { Book } from "../../types";

interface Vars {
    userId: string;
}

interface Data {
    books: Book[];
}

const Books = () => {
    const { userId, search} = useSelector(queryItemsSelector);
    const { error, data } = useQuery<Data, Vars>(GET_BOOKS, { variables: { userId } });
    const dispatch: AppDispatch = useDispatch();
    const scrollCondition = useInfiniteScroll(search);
    const books = useSearch<Book>(data?.books, ["author", "title", "completed"], search);

    useEffect(() => {
        if (error?.message) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        }
    }, [data, error, dispatch]);

    // Delete book
    const [confirmData, setConfirmData] = useState<Book | null>(null);

    const [removeBook] = useMutation(REMOVE_BOOK, {
        onError: (error) => {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        },
        update (cache) {
            const normalizedId = cache.identify({ id: confirmData?.id, __typename: "Book" });
            cache.evict({ id: normalizedId });
            cache.gc();
        }
    });

    const handleConfirmOpen = (data: Book) => () => setConfirmData(data);
    const handleConfirmClose = () => setConfirmData(null);

    const handleDelete = () => {
        const id = confirmData?.id;
        setConfirmData(null);
        removeBook({ variables: { id } });
    };

    return (
        <>
            <ConfirmDialog
                title="Remove book?"
                data={confirmData}
                Content={BookCard}
                onClose={handleConfirmClose}
                onConfirm={handleDelete}
            />
            <Grid
                container
                component="main"
                spacing={2}
                sx={{ p: 2, backgroundColor: "#f4f4ff"}}
            >
                {books
                    .filter(scrollCondition)
                    .map((book) => (
                        <Grid key={book.id} item xs={12} sm={6} md={4}>
                            <Card variant="outlined">
                                <BookCard {...book} />
                                <CardActions >
                                    <Link to={`/books/${book.id}`}>
                                        <IconButton color="primary" size="small" sx={{ ml: "auto" }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                    <IconButton onClick={handleConfirmOpen(book)} color="primary" size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </>
    );
};

export default Books;
