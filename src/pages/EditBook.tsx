import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useFragment, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { openSnackbar } from "../store/app-slice";

interface FormData {
    author: string;
    title: string;
    mode: Mode;
    completed: string;
}

enum Mode {
    Regular = "REGULAR",
    Audio = "AUDIO",
    Mixed = "MIXED",
}

const BOOK_FRAGMENT = gql`
    fragment UpdateFragment on Book {
        author
        title
        mode
        completed
    }
`;

const UPDATE_BOOK = gql`
    mutation UpdateBook($id: ID!, $bookContent: UpdateBookContent!) {
        updateBook(id: $id, bookContent: $bookContent) {
            ...UpdateFragment
        }
    }
    ${BOOK_FRAGMENT}
`;

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const { data } = useFragment<FormData>({
        from: { __typename: "Book", id },
        fragment: BOOK_FRAGMENT,
    });

    const [formData, setFormData] = useState<FormData>({
        author: data.author ?? "",
        title: data.title ?? "",
        mode: data.mode ?? Mode.Regular,
        completed: data.completed?.substring(0, 10) ?? "",
    });

    const [updateBook, { error, data: result }] = useMutation(UPDATE_BOOK, {
        update(cache, { data: { updateBook } }) {
            cache.updateFragment({
                id: `Book:${id}`,
                fragment: BOOK_FRAGMENT,
            }, () => updateBook)
        }
    });

    useEffect(() => {
        if (error?.message) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        }

        if (result?.updateBook) {
            dispatch(openSnackbar({
                message: `Book updated`,
                severity: "success",
            }));
            navigate("/books");
        }
    }, [result, error, dispatch]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateBook({ variables: { id, bookContent: formData } });
    };

    return (
        <Box component="form" sx={{ maxWidth: 400, m: 8 }} onSubmit={handleSubmit}>
            <TextField
                label="Author"
                variant="outlined"
                fullWidth
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
            />
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                sx={{ mt: 4 }}
            />
            <TextField
                label="Mode"
                variant="outlined"
                select
                fullWidth
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                required
                sx={{ mt: 4 }}
            >
                {Object.entries(Mode).map(([key, value]) => (
                    <MenuItem key={key} value={value}>{key}</MenuItem>
                ))}
            </TextField>
            <TextField
                label="Completed"
                variant="outlined"
                fullWidth
                name="completed"
                value={formData.completed}
                onChange={handleChange}
                required
                helperText="yyyy-mm-dd"
                sx={{ mt: 4 }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 5 }}>
                Save book
            </Button>
        </Box>
    );
};

export default EditBook;
