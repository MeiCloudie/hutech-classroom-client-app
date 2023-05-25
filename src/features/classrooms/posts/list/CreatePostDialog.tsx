import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import AddIcon from "@mui/icons-material/Add";
import { Box, DialogContent } from "@mui/material";
import PostForm from "./forms/PostForm";
import MiniDetailsLayout from "../../layout/MiniDetailsLayout";

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

        <DialogContent sx = {{ p: "20px 100px"}}>
          <MiniDetailsLayout
            component={
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "#f5f5f5",
                  display: "flex",
                  width: "100%",
                  p: 2,
                  border: "1px solid #e8e8e8",
                  borderRadius: "5px",
                  transition:
                    "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                    transform: "translateY(-4px)",
                  },
                  justifyContent: "center",
                }}
              >
                <PostForm />
              </Box>
            }
          />
        </DialogContent>

        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List> */}
      </Dialog>
    </Box>
  );
};

export default CreatePostDialog;
