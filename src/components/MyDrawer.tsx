import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";

interface Props {
    navItems: string[];
    open: boolean;
    onClose: () => void;
}

const MyDrawer = ({ navItems, open, onClose }: Props) => {
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
                    {navItems.map((item) => (
                        <ListItem key={item} disablePadding>
                            <ListItemButton sx={{ textAlign: "left" }}>
                                <ListItemText primary={item} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default MyDrawer;
