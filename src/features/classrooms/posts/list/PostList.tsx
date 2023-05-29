import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { Post } from "../../../../app/models/Post";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useStore } from "../../../../app/stores/store";
import { PaginationParams } from "../../../../app/common/models/paginationPrams";
import { observer } from "mobx-react-lite";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { classroomStore, postStore } = useStore();
  const { classroomId } = useParams<{ classroomId: string }>();

  useEffect(() => {
    if (classroomId)
      classroomStore.get(classroomId).then(() => {
        postStore.loadClassroomPosts(classroomId, new PaginationParams(1, 100)).then(() => {
          setPosts(postStore.items);
        });
      });
  }, [classroomId, classroomStore, postStore]);
  return (
    <Box>
      {posts.map((p, index) => (
        <PostCard key={index} post={p} />
      ))}
    </Box>
  );
};

export default observer(PostList);
