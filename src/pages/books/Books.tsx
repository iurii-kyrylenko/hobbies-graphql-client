import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { confirmDelete, openSnackbar, queryItemsSelector } from "../../store/app-slice";
import { useInfiniteScroll } from "../../hooks/use-infinite-scroll";
import { useSearch } from "../../hooks/use-search";
import { GET_BOOKS } from "../../queries/books";
import BookCard from "../../components/books/BookCard";
import { Book } from "../../types";

interface Vars {
    userId: string | null;
}

interface Data {
    books: Book[];
}

const Books = () => {
    const { userId, search } = useSelector(queryItemsSelector);
    const [queryParams] = useSearchParams();
    const externalUserId = queryParams.get("user");
    const targetUserId = externalUserId ?? userId;

    const { error, data } = useQuery<Data, Vars>(GET_BOOKS, {
        variables: { userId: targetUserId },
        fetchPolicy: !userId || targetUserId === userId ? "cache-first" : "network-only",
    });

    const dispatch: AppDispatch = useDispatch();
    const scrollCondition = useInfiniteScroll(search);
    const books = useSearch<Book>(data?.books, ["author", "title", "mode", "completed"], search);

    useEffect(() => {
        if (error?.message) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        }
    }, [data, error, dispatch]);

    const handleDelete = (book: Book) => () => dispatch(confirmDelete(book));

    return (
        <Grid
            container
            component="main"
            spacing={2}
            sx={{ p: 2, backgroundColor: "#f4f4ff" }}
        >
            {books
                .filter(scrollCondition)
                .map((book) => (
                    <Grid key={book.id} item xs={12} sm={6} md={4}>
                        <Card variant="outlined">
                            <BookCard {...book} />
                            {targetUserId === userId && (<CardActions >
                                <Link to={`/books/${book.id}`}>
                                    <IconButton color="primary" size="small" sx={{ ml: "auto" }}>
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                <IconButton onClick={handleDelete(book)} color="primary" size="small">
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>)}
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
};

export default Books;
