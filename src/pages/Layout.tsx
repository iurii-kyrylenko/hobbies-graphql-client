import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { toggleDrawer, login  } from "../store/app-slice";
import MyAppBar from "../components/MyAppBar";
import MyDrawer from "../components/MyDrawer";
import MySpeedDial from "../components/MySpeedDial";

const Layout = () => {
    const isDrawerOpen = useSelector((state: RootState) => state.drawerOpen);
    const dispatch: AppDispatch = useDispatch();
    const handleToggleDrawer = () => dispatch(toggleDrawer());

    useEffect(() => {
        const token = localStorage.getItem("token");
        dispatch(login(token));
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

export default Layout;
