import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useMemo, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { openSnackbar, queryItemsSelector } from "../store/app-slice";
import { useInfiniteScroll } from "../hooks/use-infinite-scroll";
import ConfirmDialog from "../components/ConfirmDialog";

interface Vars {
    userId: string;
}

interface Data {
    books: any[];
}

const GET_BOOKS = gql`
    query getBooks($userId: ID!) {
        books(userId: $userId) {
            id
            author
            title
            mode
            completed
        }
    }
`;

const REMOVE_BOOK = gql`
    mutation deleteBook($id: ID!) {
        deleteBook(id: $id) {
            id
        }
    }
`;

const Books = () => {
    const { userId, search} = useSelector(queryItemsSelector);
    const { error, data } = useQuery<Data, Vars>(GET_BOOKS, { variables: { userId } });
    const dispatch: AppDispatch = useDispatch();
    const limit = useInfiniteScroll();

    const books = useMemo(() =>
        (data?.books ?? []).filter(({ author, title }) => {
            const regexp = new RegExp(search, "i");
            return regexp.test(author) || regexp.test(title);
        }),
        [search, data?.books]
    );

    useEffect(() => {
        if (error?.message) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        }
    }, [data, error, dispatch]);

    // Delete book
    const [confirmData, setConfirmData] = useState<any>(null);

    const [removeBook] = useMutation(REMOVE_BOOK, {
        onError: (error) => {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        },
        update (cache) {
            const normalizedId = cache.identify({ id: confirmData.id, __typename: "Book" });
            cache.evict({ id: normalizedId });
            cache.gc();
        }
    });

    const handleConfirmOpen = (data: any) => () => setConfirmData(data);
    const handleConfirmClose = () => setConfirmData(null);

    const handleDelete = () => {
        const id = confirmData.id;
        setConfirmData(null);
        removeBook({ variables: { id } });
    };

    return (
        <>
            <ConfirmDialog data={confirmData} onClose={handleConfirmClose} onConfirm={handleDelete} />
            <Grid container component="main" spacing={2} sx={{ p: 2, backgroundColor: "#f4f4ff" }}>
                {books
                    .filter((_b, idx) => idx < limit)
                    .map((book) => (
                        <Grid key={book.id} item xs={12} sm={6} md={4}>
                            <Card variant="outlined">
                                <CardContent>
                                    <pre style={{ whiteSpace: "pre-wrap" }}>
                                        {JSON.stringify(book, null, 2)}
                                    </pre>
                                </CardContent>
                                <CardActions >
                                    <Link to={`/books/${book.id}`}>
                                        <IconButton color="primary" size="small" sx={{ ml: "auto" }}><EditIcon /></IconButton>
                                    </Link>
                                    <IconButton onClick={handleConfirmOpen(book)} color="primary" size="small"><DeleteIcon /></IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </>
    );
};

export default Books;
