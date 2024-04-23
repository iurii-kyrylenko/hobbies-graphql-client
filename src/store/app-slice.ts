import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
    drawerOpen: boolean;
    search: string;
    token: string;
}

const initialState: AppState = {
    drawerOpen: false,
    search: "",
    token: "",
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = "";
        },
        toggleDrawer: (state) => {
            state.drawerOpen = !state.drawerOpen;
        },
        search: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
});

export default appSlice.reducer;
export const { login, logout, toggleDrawer, search } = appSlice.actions;
