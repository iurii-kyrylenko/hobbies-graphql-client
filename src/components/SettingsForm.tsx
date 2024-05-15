import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { openSnackbar } from "../store/app-slice";

export interface SettingsData {
    shareBooks: boolean;
    shareMovies: boolean;
}

export interface SubmitData {
    shareBooks?: boolean;
    shareMovies?: boolean;
    password?: string;
}

interface FormData {
    shareBooks: boolean;
    shareMovies: boolean;
    password: string;
    confirmation: string;    
}

interface Props {
    data?: SettingsData;
    onSubmit: (submitData: SubmitData) => void;
}

const SettingsForm = ({ data, onSubmit }: Props) => {
    const dispatch: AppDispatch = useDispatch();

    const [formData, setFormData] = useState<FormData>({
        shareBooks: false,
        shareMovies: false,
        password: "",
        confirmation: "",
    });

    useEffect(() => {
        setFormData({
            shareBooks: data?.shareBooks ?? false,
            shareMovies: data?.shareMovies ?? false,
            password: "",
            confirmation: "",
        });
    }, [data]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value.trim() });
    };

    const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { shareBooks, shareMovies, password, confirmation } = formData;
        const message =
            password && password.length < 8 ? "Password too short!" :
            password !== confirmation ? "Password and confirmation differ!" :
            null;
        if (message) {
            dispatch(openSnackbar({ message: message, severity: "warning" }));
            return;
        }
        const submitData = {
            shareBooks,
            shareMovies,
            ...(password ? { password } : {}),
        };
        onSubmit(submitData);
    };

    return (
        <Box component="form" sx={{ width: 300, m: 6 }} onSubmit={handleSubmit}>
            <FormControlLabel
                label="Share Books"
                control={<Checkbox
                    name="shareBooks"
                    checked={formData.shareBooks}
                    onChange={handleCheckChange}
                />}
            />
            <FormControlLabel
                label="Share Movies"
                control={<Checkbox
                    name="shareMovies"
                    checked={formData.shareMovies}
                    onChange={handleCheckChange}
                />}
            />
            <TextField
                label="New password"
                variant="outlined"
                fullWidth
                autoComplete="on"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                sx={{ my: 2 }}
            />
            <TextField
                label="Confirmation"
                variant="outlined"
                fullWidth
                autoComplete="on"
                name="confirmation"
                type="password"
                value={formData.confirmation}
                onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 4 }}>
                Update
            </Button>
        </Box>
    );
};

export default SettingsForm;