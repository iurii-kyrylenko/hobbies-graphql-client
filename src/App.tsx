import * as React from "react";
import MyAppBar from "./components/MyAppBar";
import MyDrawer from "./components/MyDrawer";
import MyContent from "./components/MyContent";
import { Box } from "@mui/material";

const navItems = ["Home", "About", "Contact"];

const App = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleMobileToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    return (
        <Box>
            <MyAppBar navItems={navItems} onMobileClick={handleMobileToggle} />
            <MyDrawer navItems={navItems} open={mobileOpen} onClose={handleMobileToggle} />
            <MyContent />
        </Box>
    );
};

export default App;
