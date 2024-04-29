import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { openSnackbar, queryItemsSelector } from "../store/app-slice";
import { useInfiniteScroll } from "../hooks/use-infinite-scroll";

interface Vars {
    userId: string;
    search: string;
}

interface Data {
    books: any[];
}

const GET_BOOKS = gql`
    query getBooks($userId: ID!, $search: String) {
        books(userId: $userId, search: $search) {
            id
            author
            title
            mode
            completed
        }
    }
`;
const Books = () => {
    const variables = useSelector(queryItemsSelector);
    const { error, data } = useQuery<Data, Vars>(GET_BOOKS, { variables });
    const dispatch: AppDispatch = useDispatch();
    const limit = useInfiniteScroll();

    useEffect(() => {
        if (error?.message) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        }
    }, [data, error, dispatch]);

    return (
        <Grid container component="main" spacing={2} sx={{ p: 2/*, backgroundColor: "#f4f4f4"*/ }}>
            {data?.books
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
                                <IconButton color="primary" size="small"><DeleteIcon /></IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
};

export default Books;
