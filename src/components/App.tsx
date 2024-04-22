import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { toggleDrawer, search  } from "../store/app-slice";
import MyAppBar from "./MyAppBar";
import MyDrawer from "./MyDrawer";
import MySpeedDial from "./MySpeedDial";

const App = () => {
    const isDrawerOpen = useSelector((state: RootState) => state.drawerOpen);
    const searchTag = useSelector((state: RootState) => state.search);
    const dispatch: AppDispatch = useDispatch();

    const handleToggleDrawer = () => dispatch(toggleDrawer());
    const handleSearch = (searchTag: string) => dispatch(search(searchTag));

    return (
        <>
            <MyAppBar onDrawerClick={handleToggleDrawer} onSearch={handleSearch} />
            <MyDrawer open={isDrawerOpen} onClose={handleToggleDrawer} />
            <MySpeedDial />
            <Outlet context={searchTag} />
        </>
    );
};

export default App;
