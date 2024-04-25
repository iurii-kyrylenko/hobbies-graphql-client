import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

type Severity = "success" | "info" | "warning" | "error" | undefined;

interface AppState {
    drawerOpen: boolean;
    snackbarOpen: boolean;
    snackbarMessage: string;
    snackbarSeverity: Severity;
    search: string;
    userId: string;
    userName: string;
}

const initialState: AppState = {
    drawerOpen: false,
    snackbarOpen: false,
    snackbarMessage: "",
    snackbarSeverity: undefined,
    search: "",
    userId: "",
    userName: "",
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string | null>) => {
            const { userId, userName } = parseToken(action.payload);
            state.userId = userId;
            state.userName = userName;
        },
        logout: (state) => {
            state.userId = "";
            state.userName = "";
        },
        toggleDrawer: (state) => {
            state.drawerOpen = !state.drawerOpen;
        },
        openSnackbar: (state, action: PayloadAction<{ message: string, severity: Severity }>) => {
            state.snackbarOpen = true;
            state.snackbarMessage = action.payload.message;
            state.snackbarSeverity = action.payload.severity;

        },
        closeSnackbar: (state) => {
            state.snackbarOpen = false;
        },
        search: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
});

const parseToken = (token: string | null) => {
    const payload = token?.split('.')[1] ?? "";
    try {
        const { sub, exp, name } = JSON.parse(atob(payload));
        return (exp > (Date.now() / 1000))
            ? { userId: sub ?? "", userName: name ?? "" }
            : { userId: "", userName: "" };
    } catch {
        return { userId: "", userName: "" };
    };
};

export default appSlice.reducer;

export const {
    login,
    logout,
    toggleDrawer,
    openSnackbar,
    closeSnackbar,
    search
} = appSlice.actions;

export const snackbarSelector = createSelector(
    (state: AppState) => state.snackbarOpen,
    (state: AppState) => state.snackbarMessage,
    (state: AppState) => state.snackbarSeverity,
    (open, message, severity) => ({ open, message, severity })
);
