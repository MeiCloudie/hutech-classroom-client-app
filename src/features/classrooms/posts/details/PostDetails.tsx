import { Box } from "@mui/material";
import MiniDetailsLayout from "../../layout/MiniDetailsLayout";

import PostComment from "../comments/list/PostComment";
import PostContent from "./PostContent";

const PostDetails = () => {


  return (
    <Box>
      <MiniDetailsLayout
        component={
          <Box>
            <PostContent />
            <PostComment />
          </Box>
        }
      />
    </Box>
  );
};

export default PostDetails;
