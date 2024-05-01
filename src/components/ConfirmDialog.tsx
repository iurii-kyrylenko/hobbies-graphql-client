import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
    data: any;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDialog = ({ data, onClose, onConfirm }: Props) => {
    return (
        <Dialog
            open={!!data}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Remove item?"}
            </DialogTitle>
            <Card variant="outlined">
                <CardContent>
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </CardContent>
            </Card>
            <DialogActions>
                <Button onClick={onClose}>Disagree</Button>
                <Button onClick={onConfirm} autoFocus>Agree</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
