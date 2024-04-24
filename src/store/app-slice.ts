import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
    drawerOpen: boolean;
    search: string;
    userId: string;
    userName: string;
}

const initialState: AppState = {
    drawerOpen: false,
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
    // ==== fake ====
    // return
    //     userId: token ? "12345" : "",
    //     userName: token ? token.substring(0, 16) : "",
    // };
};

export default appSlice.reducer;
export const { login, logout, toggleDrawer, search } = appSlice.actions;
