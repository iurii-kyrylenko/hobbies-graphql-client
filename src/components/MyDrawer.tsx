import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/MenuBook';
import MovieIcon from '@mui/icons-material/LocalMovies';
import ErrorIcon from '@mui/icons-material/Error';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { logout, openSnackbar } from "../store/app-slice";

const LinkedListItem = ({ text, path, icon }: { text: string; path: string, icon: ReactNode }) => (
    <ListItem key={text} disablePadding>
        <ListItemButton sx={{ textAlign: "left" }}>
            <ListItemIcon>{icon}</ListItemIcon>
            <Link to={path}><ListItemText primary={text} /></Link>
        </ListItemButton>
    </ListItem>
);

const LogoutListItem = ({ text, icon }: { text: string, icon: ReactNode }) => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
        dispatch(openSnackbar({ message: "You are logged out", severity: "info" }));
    };

    return (
        <ListItem key="Logout" disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ textAlign: "left" }}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    );
};

interface Props {
    open: boolean;
    onClose: () => void;
}

const MyDrawer = ({ open, onClose }: Props) => {
    const isAuthenticated = useSelector((state: RootState) => Boolean(state.userName));
    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            PaperProps={{ sx: { width: { xs: "75%", sm: "25%" } } }}
        >
            <Box onClick={onClose}>
                <Typography variant="h6" sx={{ ml: 2, my: 2 }}>MY HOBBIES</Typography>
                <Divider />
                {isAuthenticated ?
                    <List>
                        <LinkedListItem text="Home" path="" icon={<HomeIcon />} />
                        <LinkedListItem text="People" path="people" icon={<PeopleIcon />} />
                        <LinkedListItem text="Books" path="books" icon={<BookIcon  />} />
                        <LinkedListItem text="Movies" path="movies" icon={<MovieIcon />} />
                        <LinkedListItem text="Error" path="42" icon={<ErrorIcon />} />
                        <Divider />
                        <LogoutListItem text="Logout" icon={<LogoutIcon />} />
                    </List> :
                    <List>
                        <LinkedListItem text="Home" path="" icon={<HomeIcon />} />
                        <LinkedListItem text="People" path="people" icon={<PeopleIcon />} />
                        <LinkedListItem text="Error" path="42" icon={<ErrorIcon />} />
                        <Divider />
                        <LinkedListItem text="Login" path="login"  icon={<LoginIcon />} />
                        <LinkedListItem text="Signup" path="register"  icon={<PersonAddIcon />} />
                    </List>}
            </Box>
        </Drawer>
    );
};

export default MyDrawer;
