import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { toggleDrawer, login  } from "../store/app-slice";
import MyAppBar from "../components/MyAppBar";
import MyDrawer from "../components/MyDrawer";
import MySnackbar from "../components/MySnackbar";
import MyFab from "../components/MyFab";
import ConfirmDialog from "../components/DeleteDialog";

const Layout = () => {
    const isDrawerOpen = useSelector((state: RootState) => state.drawerOpen);
    const dispatch: AppDispatch = useDispatch();
    const handleToggleDrawer = () => dispatch(toggleDrawer());

    useEffect(() => {
        const token = localStorage.getItem("token");
        dispatch(login(token));
    }, [dispatch]);

    return (
        <>
            <MyAppBar onDrawerClick={handleToggleDrawer} />
            <MyDrawer open={isDrawerOpen} onClose={handleToggleDrawer} />
            <MySnackbar />
            <MyFab />
            <ConfirmDialog />
            <Outlet />
        </>
    );
};

export default Layout;
