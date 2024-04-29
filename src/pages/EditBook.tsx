import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, FormEvent, useState } from "react";
import MenuItem from "@mui/material/MenuItem";

enum Mode {
    Regular = "REGULAR",
    Audio = "AUDIO",
    Mixed = "MIXED",
}

const EditBook = () => {
    const [formData, setFormData] = useState({
        author: "",
        title: "",
        mode: Mode.Regular,
        completed: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Box component="form" sx={{ maxWidth: 400, m: 8 }} onSubmit={handleSubmit}>
            <TextField
                label="Author"
                variant="outlined"
                fullWidth
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
            />
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
                label="Mode"
                variant="outlined"
                select
                fullWidth
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                required
                sx={{ mt: 4 }}
            >
                {Object.entries(Mode).map(([key, value]) => (
                    <MenuItem key={key} value={value}>{key}</MenuItem>
                ))}
            </TextField>
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
                Save book
            </Button>
        </Box>
    );
};

export default EditBook;
