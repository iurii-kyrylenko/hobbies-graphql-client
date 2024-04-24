import { ChangeEvent, FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { login } from "../store/app-slice";

const Login = () => {
    const [formData, setFormData] = useState({
        token: "",
    });

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        localStorage.setItem("token", formData.token);
        dispatch(login(formData.token));
        navigate("/");
    };
    
    return (
        <Box component="form" textAlign="left" sx={{ m: 6 }} onSubmit={handleSubmit}>
            <TextField
                label="Token"
                variant="outlined"
                fullWidth
                name="token"
                value={formData.token}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Login
            </Button>
        </Box>
    );
};

export default Login;
