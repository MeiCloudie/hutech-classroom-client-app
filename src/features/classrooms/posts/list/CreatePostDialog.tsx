import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import AddIcon from "@mui/icons-material/Add";
import { Box, DialogContent } from "@mui/material";
import MiniDetailsLayout from "../../layout/MiniDetailsLayout";
import PostForm from "./form/PostForm";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreatePostDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ textAlign: "start" }}>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        TẠO BÀI ĐĂNG
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            <Typography
              sx={{ ml: 2, flex: 1, fontWeight: "bold" }}
              variant="h6"
              component="div"
            >
              TẠO BÀI ĐĂNG
            </Typography>

            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              LƯU
            </Button> */}
          </Toolbar>
        </AppBar>

        <DialogContent sx={{ p: "20px 100px" }}>
          <MiniDetailsLayout
            component={<PostForm handleClose={handleClose} />}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreatePostDialog;
