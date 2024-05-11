import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { confirmDelete, deleteItemSelector, openSnackbar } from "../store/app-slice";
import BookCard from "./books/BookCard";
import MovieCard from "./movies/MovieCard";
import { useMutation } from "@apollo/client";
import { REMOVE_BOOK } from "../queries/books";
import { REMOVE_MOVIE } from "../queries/movies";

const DeleteDialog = () => {
    const { data, userId } = useSelector(deleteItemSelector);
    const dispatch: AppDispatch = useDispatch();

    const query = data?.__typename === "Book" ? REMOVE_BOOK : REMOVE_MOVIE;
    const [removeItem] = useMutation(query, {
        onError: (error) => {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        },
        update (cache) {
            const normalizedId = cache.identify({
                id: data?.id,
                __typename: data?.__typename
            });
            cache.evict({ id: normalizedId });
            cache.gc();
        }
    });

    const handleConfirm = () => {
        removeItem({ variables: { id: data?.id, userId } });
        dispatch(confirmDelete(null));
        dispatch(openSnackbar({ message: `Deleted: ${data?.title}`, severity: "success" }));
    }

    const handleClose = () => dispatch(confirmDelete(null));

    return (
        <Dialog
            open={!!data}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle variant="button" id="alert-dialog-title">
                {data?.__typename === "Book" ? "Delete book?" : "Delete movie?"}
            </DialogTitle>

            <Card variant="outlined" sx={{ overflowY: "auto" }}>
                {data?.__typename === "Book" 
                ? <BookCard {...data} />
                : <MovieCard {...data} />}
            </Card>

            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleConfirm} autoFocus>Agree</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;
