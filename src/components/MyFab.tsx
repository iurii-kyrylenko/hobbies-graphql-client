import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add"
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const MyFab = () => {
    const { pathname } = useLocation();
    const [queryParams] = useSearchParams();
    const userId = useSelector((state: RootState) => state.userId);

    const to = useMemo(() =>
        {
            const extUserId =  queryParams.get("user");
            if (!userId || extUserId && (userId !== extUserId)) {
                return null;
            }

            return pathname === "/books"
                ? "/books/new"
                : pathname === "/movies"
                ? "/movies/new"
                : null;
        },
        [pathname, userId, queryParams]
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