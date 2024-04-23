import { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { search  } from "../store/app-slice";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled } from "@mui/material/styles";
import { useLocation } from 'react-router-dom';

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    [theme.breakpoints.down("sm")]: { width: "40%" },
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const MySearch = () => {
    const [value, setValue] = useState<string>("");
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(search(""));
        setValue("");
    }, [location.pathname]);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            dispatch(search(value));
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
        setValue(event.currentTarget.value);

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                type="search"
                onChange={handleChange}
                value={value}
                onKeyDown={handleKeyDown}
            />
        </Search>
    );
};

export default MySearch;
