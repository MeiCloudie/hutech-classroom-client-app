import { Box } from "@mui/material";
import { Comment } from "../../../../../app/models/Comment";
import Profile from "../../../../../app/common/models/Profile";
import CommentCard from "./CommentCard";
import { useEffect } from "react";
import { useStore } from "../../../../../app/stores/store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

const member: Profile = {
  id: "m1",
  userName: "2080500605",
  email: "hello@a.com",
  firstName: "Nguyen Van",
  lastName: "Anh",
};
const comments: Comment[] = [
  {
    id: "c1",
    createDate: new Date(2222, 2, 2),
    content: "hi",
    user: member,
  },
  {
    id: "c2",
    createDate: new Date(2222, 2, 2),
    content: "hi",
    user: member,
  },
];

const CommentList = () => {
  const { commentStore, postStore } = useStore();
  const { postId } = useParams<{ postId: string }>();
  useEffect(() => {
    if (postId) {
      postStore.get(postId).then(() => {
        commentStore.createHubConnection(postId)
      })
    }
    return () => {
      commentStore.clearComments()
    }
  }, [commentStore, postId, postStore])
  return (
    <Box>
      {commentStore.comments.map((c, index) => (
        <CommentCard key={index} comment={c} />
      ))}
    </Box>
  );
};

export default observer(CommentList);
