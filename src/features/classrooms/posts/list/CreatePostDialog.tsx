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
import PostForm from "./forms/PostForm";
import MiniDetailsLayout from "../../layout/MiniDetailsLayout";
import { Post, PostFormValues } from "../../../../app/models/Post";
import { store } from "../../../../app/stores/store";
import EntityForm from "../../../common/forms/EntityForm";
import { router } from "../../../../app/router/Routes";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreatePostDialog = () => {
  const { classroomId } = useParams<{classroomId: string}>()
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
                <EntityForm<Post, PostFormValues>
                  entityStore={store.postStore}
                  toFormValues={(entity) => new PostFormValues(entity)}
                  selectionFields={[]}
                  validateObject={{
                    content: Yup.string().required("Hãy nhập nội dung"),
                  }}
                  fieldConfigs={[
                    { fieldKey: 'content', props: { label: "Nội Dung", placeholder: "Hãy nhập nội dung bài đăng tại đây"}},
                    { fieldKey: 'link', props: { label: "Liên Kết", placeholder: "Hãy thêm đường dẫn liên kết tại đây!"}},
                  ]}
                  excludeFields={['classroomId', 'userName']}
                  onCreate={handleClose}
                  onUpdate={handleClose}
                  onSetAdditionalValues={(postFormValues) => { 
                    postFormValues.userName = store.userStore.user?.userName
                    postFormValues.classroomId = classroomId
                  }}
                />
              </Box>
            }
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreatePostDialog;
