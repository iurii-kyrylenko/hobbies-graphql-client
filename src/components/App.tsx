import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { toggleDrawer, login  } from "../store/app-slice";
import MyAppBar from "./MyAppBar";
import MyDrawer from "./MyDrawer";
import MySpeedDial from "./MySpeedDial";

const App = () => {
    const isDrawerOpen = useSelector((state: RootState) => state.drawerOpen);
    const dispatch: AppDispatch = useDispatch();
    const handleToggleDrawer = () => dispatch(toggleDrawer());

    // TODO: Check for token expiration.
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(login(token));
        }
    }, [dispatch]);

    const { pathname } = useLocation();
    const isSpeedDial = (pathname === "/books") || (pathname === "/movies");

    return (
        <>
            <MyAppBar onDrawerClick={handleToggleDrawer} />
            <MyDrawer open={isDrawerOpen} onClose={handleToggleDrawer} />
            {isSpeedDial && <MySpeedDial />}
            <Outlet />
        </>
    );
};

export default App;
