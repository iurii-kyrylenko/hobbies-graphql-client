import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MySearch from "./MySearch";

interface Props {
    navItems: string[];
    onMobileClick: () => void;
}

const MyAppBar = ({ navItems, onMobileClick }: Props) => {
    return (
        <AppBar component="nav" position="sticky">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onMobileClick}
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                >
                    MUI
                </Typography>

                <MySearch />

                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    {navItems.map((item) => (
                        <Button key={item} sx={{ color: "#fff" }}>
                            {item}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;
