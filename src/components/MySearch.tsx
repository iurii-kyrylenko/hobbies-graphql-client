import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import { alpha, styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import grey from "@mui/material/colors/grey";
import { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { search } from "../store/app-slice";

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setValue(e.currentTarget.value);

    const handleClear = () => {
        setValue("");
        dispatch(search(""));
    }

    useEffect(() => {
        const timer = setTimeout(() => dispatch(search(value)), 800);
        return () => clearTimeout(timer);
    }, [value]);

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                autoComplete="off"
                inputProps={{ "aria-label": "search", id: "search" }}
                onChange={handleChange}
                value={value}
                endAdornment={value &&
                    <InputAdornment position="end">
                        <IconButton onClick={handleClear} edge="start">
                            <ClearIcon sx={{ fontSize: 20, color: grey[200] }} />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </Search>
    );
};

export default MySearch;
