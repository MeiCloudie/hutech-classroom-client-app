import { Box } from "@mui/material";
import MiniDetailsLayout from "../../layout/MiniDetailsLayout";

import PostComment from "../comments/list/PostComment";
import PostContent from "./PostContent";
import { observer } from "mobx-react-lite";

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

export default observer(PostDetails);
