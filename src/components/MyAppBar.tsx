import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MySearch from "./MySearch";

interface Props {
    onDrawerClick: () => void;
    onSearch: (search: string) => void;
}

const MyAppBar = ({ onDrawerClick, onSearch }: Props) => {
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

                <Typography textAlign="center">Page Name</Typography>

                <MySearch onSearch={onSearch} />

                <Box component="div" textAlign="center">
                    <PersonIcon />
                    <Typography fontSize="8pt">user</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
