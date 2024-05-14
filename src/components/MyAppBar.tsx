import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MySearch from "./MySearch";

interface Props {
    onDrawerClick: () => void;
}

const MyAppBar = ({ onDrawerClick }: Props) => {
    const location = useLocation();
    const { id } = useParams();
    const user = useSelector((state: RootState) => state.userName);
    const [queryParams] = useSearchParams();

    const [pageName, isSearch] = useMemo(() => {
        const ext = queryParams.get("user");
        let pageName = "MY HOBBIES";
        let isSearch = false;
        switch (location.pathname) {
            case "/login": pageName = "Login"; break;
            case "/register": pageName = "Signup"; break;
            case "/people": pageName = "People"; isSearch = true; break;
            case "/books": pageName = ext ? "User's Books" : "My Books"; isSearch = true; break;
            case "/books/new": pageName = "Add Book"; break;
            case `/books/${id}`: pageName = "Edit Book"; break;
            case "/movies": pageName = ext ? "User's Movies" : "My Movies"; isSearch = true; break;
            case "/movies/new": pageName = "Add Movie"; break;
            case `/movies/${id}`: pageName = "Edit Movie"; break;
        }
        return [pageName, isSearch];
    }, [location.pathname, id, queryParams]);

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
