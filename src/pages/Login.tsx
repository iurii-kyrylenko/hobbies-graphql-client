import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { login, openSnackbar } from "../store/app-slice";

interface Vars {
    name: string;
    password: string;
}

interface Data {
    login: string;
}

const LOGIN = gql`
    query login($name: String!, $password: String!) {
        login(name: $name, password: $password)
    }
`;

const Login = () => {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [executeQuery, { data, error }] = useLazyQuery<Data, Vars>(LOGIN);

    useEffect(() => {
        if (error?.message) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        }

        if (data?.login) {
            localStorage.setItem("token", data.login);
            dispatch(login(data.login));
            navigate("/");
            dispatch(openSnackbar({ message: "You are looged in", severity: "success" }));
        }
    }, [data, error, dispatch]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        executeQuery({ variables: formData });
    };

    return (
        <Box component="form" sx={{ maxWidth: 400, m: 8 }} onSubmit={handleSubmit}>
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                type="password"
                autoComplete="on"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ mt: 4 }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 5 }}>
                Login
            </Button>
        </Box>
    );
};

export default Login;
