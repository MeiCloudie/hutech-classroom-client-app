import { Box, Typography } from "@mui/material";
import CreatePostDialog from "./CreatePostDialog";
import PostList from "./PostList";

const PostPage = () => {
  return (
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

      <CreatePostDialog />

      <PostList />
    </Box>
  );
};

export default PostPage;
