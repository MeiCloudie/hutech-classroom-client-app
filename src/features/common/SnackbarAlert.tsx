import { AlertTitle, Snackbar } from "@mui/material";

import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarAlertProps {
  severity: AlertColor | undefined;
  title: string;
  content: string;
  contentStrong?: string;
  open: boolean;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

const SnackbarAlert = (props: SnackbarAlertProps) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
    >
      <Alert
        onClose={props.handleClose}
        severity={props.severity}
        sx={{ textAlign: "start" }}
      >
        <AlertTitle>{props.title}</AlertTitle>
        {props.content} <strong>{props.contentStrong}</strong>
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
