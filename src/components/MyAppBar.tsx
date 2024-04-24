import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import MySearch from "./MySearch";

interface Props {
    onDrawerClick: () => void;
}

const MyAppBar = ({ onDrawerClick }: Props) => {
    const location = useLocation();
    let pageName = "My Hobbies";
    let isSearch = false;
    switch (location.pathname) {
        case "/login": pageName = "Login"; break;
        case "/books": pageName = "My Books"; isSearch = true; break;
        case "/movies": pageName = "My Movies"; isSearch = true; break;
    }

    // TODO: Get user data from the token.
    const token = useSelector((state: RootState) => state.token);
    const user = token ? token.substring(0, 5) : null;

    return (
        <AppBar component="nav" position="sticky">
            <Toolbar sx={{ justifyContent: "space-between", gap: "12px" }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onDrawerClick}
                >
                    <MenuIcon />
                </IconButton>

                <Typography textAlign="center">{pageName}</Typography>

                {isSearch && (<MySearch />)}

                <Box component="div" textAlign="center">
                    <PersonIcon />
                    <Typography fontSize="8pt">{user}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
