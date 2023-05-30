import { Avatar, Box, Divider, Typography } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import CommentForm from "../form/CommentForm";
import CommentList from "./CommentList";

const PostComment = () => {
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
        textAlign: "start",
      }}
    >
      <Box sx={{ mb: 2, display: "flex", color: "primary.main" }}>
        <ForumIcon sx={{ mt: "3px" }} />
        <Typography
          variant="h6"
          fontWeight={600}
          color="text.secondary"
          sx={{ marginLeft: "5px", color: "primary.main" }}
        >
          Nhận Xét
        </Typography>
      </Box>

      <Divider color="#1976d2" />

      <Box
        sx={{
          bgcolor: "#ffffff",
          p: 2,
          border: "2px solid #e0e0e0",
          borderRadius: "5px",
          transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
            transform: "translateY(-4px)",
            borderColor: "primary.main"
          },
          textAlign: "start",
          display: "flex",
          mt: 2,
          mb: 2,
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ mr: 2, bgcolor: "primary.main" }} />
        <CommentForm />
      </Box>

      <Divider />

      <CommentList />
    </Box>
  );
};

export default PostComment;
