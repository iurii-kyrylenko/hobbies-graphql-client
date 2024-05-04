import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Book, Movie } from "../types";
import BookCard from "./books/BookCard";
import MovieCard from "./movies/MovieCard";

interface Props {
    title: string;
    data: Book | Movie | null;
    Content: typeof BookCard | typeof MovieCard;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDialog = ({ title, data, Content, onClose, onConfirm }: Props) => {
    return (
        <Dialog
            open={!!data}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <Card variant="outlined">
                <Content {...data} />
            </Card>
            <DialogActions>
                <Button onClick={onClose}>Disagree</Button>
                <Button onClick={onConfirm} autoFocus>Agree</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
