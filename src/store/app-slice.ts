import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
    drawerOpen: boolean;
    search: string;
}

const initialState: AppState = {
    drawerOpen: false,
    search: "",
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.drawerOpen = !state.drawerOpen;
        },
        search: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
});
export default appSlice.reducer;
export const { toggleDrawer, search } = appSlice.actions;
