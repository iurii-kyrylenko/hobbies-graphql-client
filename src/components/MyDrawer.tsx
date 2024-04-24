import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { logout } from "../store/app-slice";

const LinkedListItem = ({ text, path }: { text: string; path: string }) => (
    <ListItem key={text} disablePadding>
        <ListItemButton sx={{ textAlign: "left" }}>
            <Link to={path}><ListItemText primary={text} /></Link>
        </ListItemButton>
    </ListItem>
);

const LogoutListItem = ({ text }: { text: string }) => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
    };

    return (
        <ListItem key="Logout" disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ textAlign: "left" }}>
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
            <Box onClick={onClose} sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ my: 2 }}>MY HOBBIES</Typography>
                <Divider />
                {isAuthenticated ?
                    <List>
                        <LinkedListItem text="Home" path="" />
                        <LinkedListItem text="Books" path="books" />
                        <LinkedListItem text="Movies" path="movies" />
                        <LinkedListItem text="Error" path="42" />
                        <Divider />
                        <LogoutListItem text="Logout" />
                    </List> :
                    <List>
                        <LinkedListItem text="Home" path="" />
                        <LinkedListItem text="Error" path="42" />
                        <Divider />
                        <LinkedListItem text="Login" path="login" />
                    </List>}
            </Box>
        </Drawer>
    );
};

export default MyDrawer;
