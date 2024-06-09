import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled } from "@mui/material/styles";
import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { search  } from "../store/app-slice";

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
    const storedSearch = useSelector((state: RootState) => state.search);
    const [value, setValue] = useState<string>(storedSearch);
    const dispatch: AppDispatch = useDispatch();

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            dispatch(search(value));
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setValue(e.currentTarget.value);

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search", id: "search" }}
                type="search"
                onChange={handleChange}
                value={value}
                onKeyDown={handleKeyDown}
            />
        </Search>
    );
};

export default MySearch;
