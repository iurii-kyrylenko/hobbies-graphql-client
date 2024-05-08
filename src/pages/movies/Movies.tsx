import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { confirmDelete, openSnackbar, queryItemsSelector } from "../../store/app-slice";
import { useInfiniteScroll } from "../../hooks/use-infinite-scroll";
import { useSearch } from "../../hooks/use-search";
import { GET_MOVIES } from "../../queries/movies";
import MovieCard from "../../components/movies/MovieCard";
import { Movie } from "../../types";

interface Vars {
    userId: string;
}

interface Data {
    movies: Movie[];
}

const Movies = () => {
    const { userId, search} = useSelector(queryItemsSelector);
    const { error, data } = useQuery<Data, Vars>(GET_MOVIES, { variables: { userId } });
    const dispatch: AppDispatch = useDispatch();
    const scrollCondition = useInfiniteScroll(search);
    const movies = useSearch<Movie>(data?.movies, ["title", "year", "notes", "completed"], search);

    useEffect(() => {
        if (error?.message) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        }
    }, [data, error, dispatch]);

    const handleDelete = (movie: Movie) => () => dispatch(confirmDelete(movie));

    return (
        <>
            <Grid
                container
                component="main"
                spacing={2}
                sx={{ p: 2, backgroundColor: "#f4f4ff"}}
            >
                {movies
                    .filter(scrollCondition)
                    .map((movie) => (
                        <Grid key={movie.id} item xs={12} sm={6} md={4}>
                            <Card variant="outlined">
                                <MovieCard {...movie} />
                                <CardActions >
                                    <Link to={`/movies/${movie.id}`}>
                                        <IconButton color="primary" size="small" sx={{ ml: "auto" }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Link>
                                    <IconButton onClick={handleDelete(movie)} color="primary" size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </>
    );
};

export default Movies;
