import { useState } from "react";
import MyAppBar from "./components/MyAppBar";
import MyDrawer from "./components/MyDrawer";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import MySpeedDial from "./components/MySpeedDial";

const App = () => {
    const [drawerOpen, setMobileOpen] = useState(false);
    const [search, setSearch] = useState("");

    const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);
    const handleSearch = (search: string) => setSearch(search);

    return (
        <Box>
            <MyAppBar onDrawerClick={handleDrawerToggle} onSearch={handleSearch} />
            <MyDrawer open={drawerOpen} onClose={handleDrawerToggle} />
            <MySpeedDial />
            <Outlet context={search}/>
        </Box>
    );
};

export default App;
