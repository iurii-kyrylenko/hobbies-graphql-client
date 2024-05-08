import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CardContent from "@mui/material/CardContent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Movie } from "../../types";
import { useQuery } from "@apollo/client";
import { MOVIE_INFO } from "../../queries/movies";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const MovieCard = ({ title, year, notes, imdbId, completed }: Movie) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = () => {
        setExpanded((state) => !state);
    };

    return (
        <CardContent>
            <pre style={{
                // whiteSpace: "pre-wrap",
                overflowY: "auto",
            }}>
                {JSON.stringify({ title, year, notes, imdbId, completed }, null, 2)}
            </pre>
            {imdbId && (
                <Accordion expanded={expanded} onChange={handleChange}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            Details...
                        </Typography>
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
    const { data } = useQuery<Data>(MOVIE_INFO, { variables: { imdbId } });
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
