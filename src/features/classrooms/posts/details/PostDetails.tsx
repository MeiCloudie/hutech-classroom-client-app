import { Box, Divider, IconButton, Typography } from "@mui/material";
import MiniDetailsLayout from "../../layout/MiniDetailsLayout";
import { blue } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ForumIcon from "@mui/icons-material/Forum";

import MenuMini from "../../../common/UI/MenuMini";
import React from "react";
import { Post } from "../../../../app/models/Post";
import { Comment } from "../../../../app/models/Comment";

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
  },
];

const PostDetails = () => {
  const [anchorElMore, setAnchorElMore] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenMoreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMore(event.currentTarget);
  };

  const handleCloseMoreMenu = () => {
    setAnchorElMore(null);
  };

  return (
    <Box>
      <MiniDetailsLayout
        component={
          <Box
            sx={{
              bgcolor: "#f5f5f5",
              p: 2,
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
              />
            </Box>

            <Typography variant="body1" color="gray" mb={2}>
              Nguyen Van A • 11/11/2022 01:02:03 PM
            </Typography>

            <Divider color="#1976d2" />

            <Box sx={{ mb: "30px" }}>
              <Typography variant="body2" color="text.secondary">
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{ padding: "0" }}
                />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.link}
              </Typography>
            </Box>

            <Divider color="#1976d2" />

            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", color: "primary.main" }}>
                <ForumIcon />
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="text.secondary"
                  sx={{ marginLeft: "5px", color: "primary.main" }}
                >
                  Nhận Xét
                </Typography>
              </Box>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

export default PostDetails;
