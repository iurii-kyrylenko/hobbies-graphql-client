import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { grey } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";
import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { search } from "../store/app-slice";

const Search = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("sm")]: { width: "40%" },
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    marginLeft: 8,
    color: "inherit",
    "& .MuiInputBase-input": {
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
        if (e.key === "Enter") {
            dispatch(search(value));
        }
    };

    const handleSearch = () => dispatch(search(value));

    const handleSearchOff = () => {
        setValue("");
        dispatch(search(""));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setValue(e.currentTarget.value);

    return (
        <Search>
            <StyledInputBase
                placeholder="Search…"
                autoComplete='off'
                inputProps={{ "aria-label": "search", id: "search" }}
                onChange={handleChange}
                value={value}
                onKeyDown={handleKeyDown}
                endAdornment={
                    <InputAdornment position="end">
                        <Divider sx={{ height: 28 }} orientation="vertical" />
                        <IconButton onClick={handleSearch} edge="end">
                            <SearchIcon sx={{ color: grey[200] }} />
                        </IconButton>
                        <IconButton onClick={handleSearchOff}>
                            <SearchOffIcon sx={{ color: grey[200] }} />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </Search>
    );
};

export default MySearch;
