import { useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CardContent from "@mui/material/CardContent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { Movie } from "../../types";
import { MOVIE_INFO } from "../../queries/movies";
import { AppDispatch } from "../../store";
import { openSnackbar } from "../../store/app-slice";

const MovieCard = ({ title, year, notes, imdbId, completed }: Movie) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = () => {
        setExpanded((state) => !state);
    };

    return (
        <CardContent>
            <Box sx={{ mx: 2, mb: 1 }}>
                <Typography sx={{ fontSize: 14 }} color="Highlight">{title}</Typography>
                <Typography sx={{ fontSize: 13 }} color="text.secondary">Release date: {year}</Typography>
                <Typography sx={{ fontSize: 13, fontStyle: "italic" }}>{notes}</Typography>
                <Typography sx={{ fontSize: 13 }} color="text.secondary">Watched on {completed?.substring(0, 10)}</Typography>
            </Box>
            {imdbId && (
                <Accordion expanded={expanded} onChange={handleChange}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontSize: 13 }} color="text.secondary">Details...</Typography>
                    </AccordionSummary>
                    {expanded && (
                        <AccordionDetails>
                            <MovieInfo imdbId={imdbId} />
                        </AccordionDetails>
                    )}
                </Accordion>
            )}
        </CardContent>
    );
};

interface Props {
    imdbId?: string;
}

interface Data {
    movieInfo: {
        poster: string;
        plot: string;
    };
}

const MovieInfo = ({ imdbId }: Props) => {
    const dispatch: AppDispatch = useDispatch();

    const { data } = useQuery<Data>(MOVIE_INFO, {
        variables: { imdbId },
        onError(error) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        },
    });
    return (
        <>
            <img src={data?.movieInfo.poster} />
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                {data?.movieInfo.plot}
            </Typography>
        </>
    );
};

export default MovieCard;
