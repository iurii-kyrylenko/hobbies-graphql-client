import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { login, openSnackbar } from "../store/app-slice";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface Data {
    register: string;
}

interface Vars {
    captchaToken: string | null;
    userData: {
        name: string;
        email: string;
        password: string;
    };
}

const RE_CAPTCHA_SITE_KEY = "6LeUuSUTAAAAAElwIcAHk994ErqNeqw7aQxlsw_H";

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmation: string;
    recaptchaToken: string | null;
}

const REGISTER = gql`
    mutation register($captchaToken: String!, $userData: UserData!) {
        register(captchaToken: $captchaToken, userData: $userData)
    }
`;

const Register = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [createUser, { data, error }] = useMutation<Data, Vars>(REGISTER);

    useEffect(() => {
        if (error?.message) {
            dispatch(openSnackbar({ message: error.message, severity: "error" }));
        }

        if (data?.register) {
            localStorage.setItem("token", data.register);
            dispatch(login(data.register));
            navigate("/");
            dispatch(openSnackbar({ message: "You are signed up", severity: "success" }));
        }
    }, [data, error, dispatch]);

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        confirmation: "",
        recaptchaToken: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value.trim() });
    };

    const handleRecaptchaChange = (value: string | null) => {
        setFormData({ ...formData, ["recaptchaToken"]: value});
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const message =
            formData.name.length < 5 ? "Name too short!" :
            !/(.+)@(.+){2,}\.(.+){2,}/.test(formData.email) ? "Invaid email format!" :
            formData.password.length < 8 ? "Password too short!" :
            formData.password !== formData.confirmation ? "Password and confirmation differ!" :
            !formData.recaptchaToken ? "Confirm that you are not a robot!" : null;
        if (message) {
            dispatch(openSnackbar({ message: message, severity: "warning" }));
            return;
        }
        createUser({
            variables: {
                captchaToken: formData.recaptchaToken,
                userData: {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                },
            },
        })
            .catch(() => null); // to prevent uncaught errors in promise
    };

    return (
        <Box component="form" sx={{ width: 300, m: 8 }} onSubmit={handleSubmit}>
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                autoComplete="on"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                autoComplete="on"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
            />
            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                autoComplete="on"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
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
                required
                sx={{ mb: 2 }}
            />
            <ReCAPTCHA sitekey={RE_CAPTCHA_SITE_KEY} onChange={handleRecaptchaChange} />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Signup
            </Button>
        </Box>
    );
};

export default Register;
