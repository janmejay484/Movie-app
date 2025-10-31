import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
                <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, textAlign: "center", p: { xs: 1, sm: 2 } }}>
          {message}
        </Typography>

      </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 1, pb: 2 }}>
          <Button onClick={onCancel} size="small">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="error" variant="contained" size="small">
            Delete
          </Button>
        </DialogActions>
    </Dialog>
  );
}
