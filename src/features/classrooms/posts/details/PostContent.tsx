import { Box, Divider, IconButton, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import MenuMini from "../../../common/UI/MenuMini";
import React, { useEffect, useState } from "react";
import { Post } from "../../../../app/models/Post";
import { Comment } from "../../../../app/models/Comment";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useStore } from "../../../../app/stores/store";
import { useParams } from "react-router-dom";

const comments: Comment[] = [
  {
    id: "c1",
    createDate: new Date(2222, 2, 2),
    content: "hi",
  },
  {
    id: "c2",
    createDate: new Date(2222, 2, 2),
    content: "hi",
  },
];

const post: Post = {
  id: "111",
  content: "<h1>hello</h1>",
  link: "http://ffff",
  createDate: new Date(2222, 2, 2),
  comments: comments,
};

const moreOptions = [
  {
    text: "Chỉnh sửa",
  },
  {
    text: "Xoá",
    dialog: "delete" as "delete",
  },
];

const PostContent = () => {
  const { postStore } = useStore();
  const [post, setPost] = useState<Post>(new Post());
  const { postId } = useParams<{ postId: string }>();

  const [anchorElMore, setAnchorElMore] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenMoreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMore(event.currentTarget);
  };

  const handleCloseMoreMenu = () => {
    setAnchorElMore(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (postId)
      postStore.get(postId).then(() => {
        setPost(postStore.selectedItem ?? new Post());
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
        <IconButton
          aria-label="more"
          sx={{
            transition: "color 0.2s",
            "&:hover": {
              color: blue[800],
            },
          }}
          onClick={handleOpenMoreMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <MenuMini
          id="menu-more"
          anchorEl={anchorElMore}
          handleCloseMenu={handleCloseMoreMenu}
          options={moreOptions}
          handleClickOpenDialog={handleClickOpen}
        />
      </Box>

      <Typography variant="body1" color="gray" mb={2}>
        {post.user?.firstName + " " + post.user?.lastName} • {post.createDate.toString()}
      </Typography>

      <Divider color="#1976d2" />

      <Box>
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

      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default PostContent;
