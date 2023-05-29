import { Box } from "@mui/material";
import { Comment } from "../../../../../app/models/Comment";
import Profile from "../../../../../app/common/models/Profile";
import CommentCard from "./CommentCard";

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
  return (
    <Box>
      {comments.map((c, index) => (
        <CommentCard key={index} comment={c} />
      ))}
    </Box>
  );
};

export default CommentList;
