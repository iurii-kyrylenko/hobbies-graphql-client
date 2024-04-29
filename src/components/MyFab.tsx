import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add"
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";

const MyFab = () => {
    const { pathname } = useLocation();
    const to = useMemo(() =>
        pathname === "/books" ? "/books/new" : pathname === "/movies" ? "/movies/new" : null,
        [pathname]
    );

    return to && (
        <Link to={to}>
            <Fab
                size="medium"
                color="primary"
                aria-label="add"
                sx={{
                    position: "fixed",
                    top: 90,
                    right: 30,
                    opacity: 0.8,
                }}
            >
                <AddIcon />
            </Fab>
        </Link>
    );
};

export default MyFab;