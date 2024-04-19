import * as React from "react";
import MyAppBar from "./components/MyAppBar";
import MyDrawer from "./components/MyDrawer";
import MyContent from "./components/MyContent";
import Box from "@mui/material/Box";
import MySpeedDial from "./components/MySpeedDial";

const navItems = ["Home", "People"];

const App = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleMobileToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    return (
        <Box>
            <MyAppBar onMobileClick={handleMobileToggle} />
            <MyDrawer navItems={navItems} open={mobileOpen} onClose={handleMobileToggle} />
            <MySpeedDial />
            <MyContent />
        </Box>
    );
};

export default App;
