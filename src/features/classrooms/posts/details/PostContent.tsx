import { Box, Divider, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { Post } from "../../../../app/models/Post";

import Button from "@mui/material/Button";
import { useStore } from "../../../../app/stores/store";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateEditDialog from "../../../common/UI/CreateEditDialog";
import PostForm from "../list/form/PostForm";
import AlertDialog from "../../../common/UI/AlertDialog";
import { observer } from "mobx-react-lite";

const PostContent = () => {
  const { postStore } = useStore();
  const [post, setPost] = useState<Post>(new Post());
  const { postId } = useParams<{ postId: string }>();
  const { classroomId } = useParams<{ classroomId: string }>();

  useEffect(() => {
    if (postId)
      postStore.get(postId).then(() => {
        console.log("Post: ", postStore.selectedItem)
        if (postStore.selectedItem) setPost(postStore.selectedItem);
      });
  }, [postId, postStore]);

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        p: 2,
        mb: 2,
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
        textAlign: "start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
            textAlign: "start",
          }}
        >
          THÔNG BÁO
        </Typography>

        <Box sx={{ display: "flex" }}>
          <AlertDialog
            iconButton={<DeleteIcon />}
            titleButton="XOÁ"
            alertDialogTitle="Xoá bài đăng?"
            alertDialogDescription="Nhận xét cũng sẽ bị xoá"
            negation="Huỷ"
            affirmation="Xoá"
          />
          <CreateEditDialog
            iconButton={<AddIcon />}
            titleButton="CHỈNH SỬA"
            titleDialog="CHỈNH SỬA BÀI ĐĂNG"
            formComponent={(handleClose) => (
              <PostForm handleClose={handleClose} />
            )}
          />
        </Box>
      </Box>

      <Typography variant="body1" color="gray" mb={2}>
        {post.user?.firstName + " " + post.user?.lastName} •{" "}
        {post.createDate.toString()}
      </Typography>

      <Divider color="#1976d2" />

      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{ padding: "0" }}
        ></Typography>
        <Typography variant="body2" color="text.secondary">
          {post.link}
        </Typography>
      </Box>

      <Divider />

      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        sx={{ mt: 2, mb: 2 }}
        component={Link}
        to={`/cr/${classroomId}/posts`}
      >
        Quay Về
      </Button>
    </Box>
  );
};

export default observer(PostContent);
