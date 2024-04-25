import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { closeSnackbar, snackbarSelector } from "../store/app-slice";

const MySnackbar = () => {
    const snackbar = useSelector((snackbar: RootState) => snackbarSelector(snackbar));
    const dispatch: AppDispatch = useDispatch();
    const handleClose = () => dispatch(closeSnackbar());

    return (
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={snackbar.severity}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
};

export default MySnackbar;
