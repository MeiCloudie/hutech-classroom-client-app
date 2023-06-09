import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

interface AlertDialogProps {
  iconButton: React.ReactNode;
  titleButton: string;
  alertDialogTitle: string;
  alertDialogDescription?: string;
  negation: string;
  affirmation: string;
  onSubmit: () => void;
  hidden?: boolean;
  disabled?: boolean;
}

const AlertDialog = (props: AlertDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: props.hidden ? "none" : "inline" }}>
      <Button
        variant="contained"
        startIcon={props.iconButton}
        sx={{ marginRight: "8px" }}
        onClick={handleClickOpen}
        disabled={props.disabled}
      >
        {props.titleButton}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.alertDialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.alertDialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "gray" }} onClick={handleClose}>
            {props.negation}
          </Button>
          <Button
            onClick={() => {
              props.onSubmit();
              handleClose();
            }}
            autoFocus
          >
            {props.affirmation}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlertDialog;
