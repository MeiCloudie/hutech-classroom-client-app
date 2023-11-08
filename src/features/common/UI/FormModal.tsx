import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import React from "react"

interface FormModalProps {
  startIcon?: React.ReactNode
  buttonText: string
  title: string
  subtitle?: string
  formComponent: (handleClose: () => void) => any
}

const FormModal = (props: FormModalProps) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        startIcon={props.startIcon}
        onClick={handleClickOpen}
      >
        {props.buttonText}
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle fontWeight={"bold"}>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.subtitle}</DialogContentText>
          {props.formComponent(handleClose)}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default FormModal
