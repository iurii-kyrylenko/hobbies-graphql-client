import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, FormEvent, useState } from "react";
import { Movie } from "../../types";

interface Props {
    data?: Movie;
    onSubmit: (formData: Movie) => void;
}

const MovieForm = ({ data, onSubmit }: Props) => {
    const [formData, setFormData] = useState<Movie>({
        title: data?.title ?? "",
        year: data?.year ?? "",
        notes: data?.notes ?? "",
        imdbId: data?.imdbId ?? "",
        completed: (data?.completed ?? new Date().toISOString()).substring(0, 10),
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box component="form" sx={{ maxWidth: 400, m: 8 }} onSubmit={handleSubmit}>
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                sx={{ mt: 4 }}
            />
            <TextField
                label="Year"
                variant="outlined"
                fullWidth
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                sx={{ mt: 4 }}
            />
            <TextField
                label="Notes"
                variant="outlined"
                fullWidth
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                sx={{ mt: 4 }}
            />
            <TextField
                label="IMDB ID"
                variant="outlined"
                fullWidth
                name="imdbId"
                value={formData.imdbId}
                onChange={handleChange}
                sx={{ mt: 4 }}
            />
            <TextField
                label="Completed"
                variant="outlined"
                fullWidth
                name="completed"
                value={formData.completed}
                onChange={handleChange}
                required
                helperText="yyyy-mm-dd"
                sx={{ mt: 4 }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 5 }}>
                Save movie
            </Button>
        </Box>
    );
};

export default MovieForm;