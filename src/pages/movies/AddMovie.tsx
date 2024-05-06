import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { openSnackbar } from "../../store/app-slice";
import MovieForm from "../../components/movies/MovieForm";
import { CREATE_MOVIE, CREATE_MOVIE_FRAGMENT } from "../../queries/movies";
import { Movie } from "../../types";

const AddMovie = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.userId);

    const [createMovie, { data, error }] = useMutation(CREATE_MOVIE, {
        update(cache, { data: { createMovie } }) {
            cache.modify({
                fields: {
                    movies(existingMovies = []) {
                        const newMovieRef = cache.writeFragment({
                            data: createMovie,
                            fragment: CREATE_MOVIE_FRAGMENT,
                        });
                        return [newMovieRef, ...existingMovies];
                    }
                },
            });
        }
    });

    useEffect(() => {
        if (error?.message) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        }

        if (data?.createMovie?.title) {
            dispatch(openSnackbar({
                message: `Movie "${data?.createMovie.title}" created`,
                severity: "success",
            }));
            navigate("/movies");
        }
    }, [data, error, dispatch]);

    const handleSubmit = (formData: Movie) => {
        createMovie({ variables: { movieContent: { userId, ...formData } } });
    };

    return <MovieForm onSubmit={handleSubmit} />;
};

export default AddMovie;
