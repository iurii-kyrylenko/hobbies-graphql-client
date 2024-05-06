import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFragment, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { openSnackbar } from "../../store/app-slice";
import MovieForm from "../../components/movies/MovieForm";
import { UPDATE_MOVIE, UPDATE_MOVIE_FRAGMENT } from "../../queries/movies";
import { Movie } from "../../types";

const EditMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const { data } = useFragment<Movie>({
        from: { __typename: "Movie", id },
        fragment: UPDATE_MOVIE_FRAGMENT,
    });

    const [updateMovie, { error, data: result }] = useMutation(UPDATE_MOVIE, {
        update(cache, { data: { updateMovie } }) {
            cache.updateFragment({
                id: cache.identify({ __typename: "Movie", id }),
                fragment: UPDATE_MOVIE_FRAGMENT,
            }, () => updateMovie);
        }
    });

    useEffect(() => {
        if (error?.message) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        }

        if (result?.updateMovie) {
            dispatch(openSnackbar({
                message: `Movie "${result?.updateMovie?.title}" updated`,
                severity: "success",
            }));
            navigate("/movies");
        }
    }, [result, error, dispatch]);

    const handleSubmit = (formData: Movie) => {
        updateMovie({ variables: { id, movieContent: formData } });
    };

    return <MovieForm data={data} onSubmit={handleSubmit} />;
};

export default EditMovie;
