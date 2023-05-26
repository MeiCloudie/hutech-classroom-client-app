import React from "react";
import PostCard from "./PostCard";
import { Post } from "../../../../app/models/Post";
import Profile from "../../../../app/common/models/Profile";

const member: Profile = {
    id: "m1",
    userName: "GV123",
    email: "gv1@gmail.com",
    firstName: "Nguyen",
    lastName: "Van A",
}

const posts: Post[] = [
  {
    id: "p1",
    content: "hello\n happy\n new\n year\n",
    link: "https://sinhvien.hutech.edu.vn/",
    createDate: new Date(),

    user: member,
    comments: [],
  },
  {
    id: "p2",
    content: "hello\n happy\n new\n year\n",
    link: "https://sinhvien.hutech.edu.vn/",
    createDate: new Date(),

    comments: [],
  },
];

const PostList = () => {
  return (
    <React.Fragment>
      {posts.map((p, index) => (
        <PostCard key={index} post={p} />
      ))}
    </React.Fragment>
  );
};

export default PostList;
