import { Box } from "@mui/material";
import CommentCard from "./CommentCard";
import { useEffect } from "react";
import { useStore } from "../../../../../app/stores/store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { PaginationParams } from "../../../../../app/common/models/paginationPrams";
import PlaceholderBox from "../../../../common/UI/PlaceholderBox";
import CommentCardSkeleton from "../../../../../app/layout/indicators/cards/CommentCardSkeleon";

const CommentList = () => {
  const { commentStore, postStore } = useStore();
  const { postId } = useParams<{ postId: string }>();
  useEffect(() => {
    if (postId) {
      postStore.get(postId).then(() => {
        commentStore.createHubConnection(postId, new PaginationParams(1, 100));
      });
    }
    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, postId, postStore]);

  if (postStore.isDetailsLoading)
    return (
      <>
        <CommentCardSkeleton />
        <CommentCardSkeleton />
        <CommentCardSkeleton />
      </>
    );

  return (
    <Box>
      {commentStore.comments.length === 0 ? (
        <PlaceholderBox
          title="Đây là nơi xem nhận xét của bài đăng"
          subtitle="Hãy thêm các nhận xét để thảo luận!"
        />
      ) : (
        commentStore.comments.map((c, index) => (
          <CommentCard key={index} comment={c} />
        ))
      )}
    </Box>
  );
};

export default observer(CommentList);
