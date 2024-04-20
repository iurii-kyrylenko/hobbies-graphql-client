import * as React from "react";
import MyAppBar from "./components/MyAppBar";
import MyDrawer from "./components/MyDrawer";
import Box from "@mui/material/Box";
import MySpeedDial from "./components/MySpeedDial";
import { Outlet } from "react-router-dom";

const App = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleMobileToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    return (
        <Box>
            <MyAppBar onMobileClick={handleMobileToggle} />
            <MyDrawer open={mobileOpen} onClose={handleMobileToggle} />
            <MySpeedDial />
            <Outlet />
        </Box>
    );
};

export default App;
