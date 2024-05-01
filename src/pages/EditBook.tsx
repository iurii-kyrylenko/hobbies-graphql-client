import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useFragment, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { openSnackbar } from "../store/app-slice";
import BookForm, { BookData } from "../components/BookForm";

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

    const { data } = useFragment<BookData>({
        from: { __typename: "Book", id },
        fragment: BOOK_FRAGMENT,
    });

    const [updateBook, { error, data: result }] = useMutation(UPDATE_BOOK, {
        update(cache, { data: { updateBook } }) {
            cache.updateFragment({
                id: cache.identify({ __typename: "Book", id }),
                fragment: BOOK_FRAGMENT,
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

    const handleSubmit = (formData: BookData) => {
        updateBook({ variables: { id, bookContent: formData } });
    };

    return <BookForm data={data as BookData} onSubmit={handleSubmit} />;
};

export default EditBook;
