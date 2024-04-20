import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
    open: boolean;
    onClose: () => void;
}

const LinkedListItem = ({ text, path }: { text: string, path: string }) => (
    <ListItem key={text} disablePadding>
        <ListItemButton sx={{ textAlign: "left" }}>
            <Link to={path}><ListItemText primary={text} /></Link>
        </ListItemButton>
    </ListItem>
);

const MyDrawer = ({ open, onClose }: Props) => {
    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            PaperProps={{ sx: { width: { xs: "75%", sm: "25%" } } }}
        >
            <Box onClick={onClose} sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ my: 2 }}>
                    MY HOBBIES
                </Typography>
                <Divider />
                <List>
                    <LinkedListItem text="Home" path={""} />
                    <LinkedListItem text="Movies" path={"movies"} />
                    <LinkedListItem text="Error" path={"42"} />
                </List>
            </Box>
        </Drawer>
    );
};

export default MyDrawer;
