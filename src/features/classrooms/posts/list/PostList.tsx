import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { Post } from "../../../../app/models/Post";
import Profile from "../../../../app/common/models/Profile";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useStore } from "../../../../app/stores/store";
import { PaginationParams } from "../../../../app/common/models/paginationPrams";

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

    user: member,
    comments: [],
  },
];

const PostList = () => {
  const [ posts, setPosts ] = useState<Post[]>([]);
  const { classroomStore } = useStore()
  const { classroomId } = useParams<{classroomId: string}>()

  useEffect(() => {
    classroomStore.loadPosts(new PaginationParams(1, 100)).then((items) => {
      setPosts(items ?? [])
    })
  })
  return (
    <Box>
      {posts.map((p, index) => (
        <PostCard key={index} post={p} />
      ))}
    </Box>
  );
};

export default PostList;
