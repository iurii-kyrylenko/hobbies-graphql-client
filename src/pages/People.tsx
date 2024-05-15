import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BookIcon from '@mui/icons-material/MenuBook';
import MovieIcon from '@mui/icons-material/LocalMovies';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { GET_PEOPLE } from "../queries/users";
import { openSnackbar } from "../store/app-slice";
import { useSearch } from "../hooks/use-search";

interface Data {
    people: {
        id: string;
        name: string;
        shareBooks: boolean;
        shareMovies: boolean;
        books: number;
        movies: number;
        total: number;
    }[];
}

const People = () => {
    const dispatch: AppDispatch = useDispatch();
    const search = useSelector((state: RootState) => state.search);

    const { data } = useQuery<Data>(GET_PEOPLE, {
        onError(error) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        },
        fetchPolicy: "network-only", // to have recent data
    });

    const people = useSearch(data?.people, ["name"], search);

    return (
        <Grid
            container
            component="main"
            spacing={2}
            sx={{ p: 2, backgroundColor: "#f4f4ff" }}
        >
            {people
                .map((user) => (
                    <Grid key={user.id} item xs={12} sm={6} md={4}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">{user.name}</Typography>
                                {user.shareBooks && user.books > 0 && (<Link to={`/books?user=${user.id}`}>
                                    <Button sx={{ m: 0.5 }} variant="outlined" startIcon={<BookIcon />}>
                                        Books: {user.books}
                                    </Button>
                                </Link>)}
                                {user.shareMovies && user.movies > 0 && (<Link to={`/movies?user=${user.id}`}>
                                    <Button sx={{ m: 0.5 }} variant="outlined" startIcon={<MovieIcon />}>
                                        Movies: {user.movies}
                                    </Button>
                                </Link>)}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
};

export default People;
