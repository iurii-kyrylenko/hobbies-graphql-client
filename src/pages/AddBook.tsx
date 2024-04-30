import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { openSnackbar } from "../store/app-slice";
import MenuItem from "@mui/material/MenuItem";


const BOOK_FRAGMENT = gql`
    fragment CreateFragment on Book {
        id
        userId
        author
        title
        mode
        completed
    }
`;

const CREATE_BOOK = gql`
    mutation CreateBook($bookContent: CreateBookContent!) {
        createBook(bookContent: $bookContent) {
            ...CreateFragment
        }
    }
    ${BOOK_FRAGMENT}
`;

enum Mode {
    Regular = "REGULAR",
    Audio = "AUDIO",
    Mixed = "MIXED",
}

const AddBook = () => {
    const [formData, setFormData] = useState({
        author: "",
        title: "",
        mode: Mode.Regular,
        completed: new Date().toISOString().substring(0,10),
    });

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.userId);

    const [createBook, { data, error }] = useMutation(CREATE_BOOK, {
        update(cache, { data: { createBook } }) {
            cache.modify({
                fields: {
                    books(existingBooks = []) {
                        const newBookRef = cache.writeFragment({
                            data: createBook,
                            fragment: BOOK_FRAGMENT,
                        });
                        return [newBookRef, ...existingBooks];
                    }
                },
            });
        }
    });

    useEffect(() => {
        if (error?.message) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        }

        if (data?.createBook?.title) {
            dispatch(openSnackbar({
                message: `New book "${data?.createBook?.title}" created`,
                severity: "success",
            }));
            navigate("/books");
        }
    }, [data, error, dispatch]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        createBook({ variables: { bookContent: { userId, ...formData } } });
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
                Add book
            </Button>
        </Box>
    );
};

export default AddBook;
