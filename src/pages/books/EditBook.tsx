import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFragment, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { openSnackbar } from "../../store/app-slice";
import BookForm from "../../components/books/BookForm";
import { UPDATE_BOOK, UPDATE_BOOK_FRAGMENT } from "../../queries/books";
import { Book } from "../../types";

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.userId);

    const { data } = useFragment<Book>({
        from: { __typename: "Book", id },
        fragment: UPDATE_BOOK_FRAGMENT,
    });

    const [updateBook, { error, data: result }] = useMutation(UPDATE_BOOK, {
        update(cache, { data: { updateBook } }) {
            cache.updateFragment({
                id: cache.identify({ __typename: "Book", id }),
                fragment: UPDATE_BOOK_FRAGMENT,
            }, () => updateBook);
        }
    });

    useEffect(() => {
        if (error?.message) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        }

        if (result?.updateBook) {
            dispatch(openSnackbar({
                message: `Book "${result?.updateBook?.title}" updated`,
                severity: "success",
            }));
            navigate("/books");
        }
    }, [result, error, dispatch]);

    const handleSubmit = (formData: Book) => {
        updateBook({ variables: { id, userId, bookContent: formData } });
    };

    return <BookForm data={data} onSubmit={handleSubmit} />;
};

export default EditBook;
