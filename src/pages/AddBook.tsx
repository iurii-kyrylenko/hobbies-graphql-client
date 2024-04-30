import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { openSnackbar } from "../store/app-slice";
import BookForm, { BookData } from "../components/BookForm";


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

const AddBook = () => {
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
                message: `Book "${data?.createBook?.title}" created`,
                severity: "success",
            }));
            navigate("/books");
        }
    }, [data, error, dispatch]);

    const handleSubmit = (formData: BookData) => {
        createBook({ variables: { bookContent: { userId, ...formData } } });
    };

    return <BookForm onSubmit={handleSubmit} />;
};

export default AddBook;
