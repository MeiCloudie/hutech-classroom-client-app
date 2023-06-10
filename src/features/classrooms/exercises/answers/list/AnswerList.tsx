import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Answer } from "../../../../../app/models/Answer";
import { useStore } from "../../../../../app/stores/store";
import { useParams } from "react-router-dom";
import { PaginationParams } from "../../../../../app/common/models/paginationPrams";
import { Box, Grid, styled } from "@mui/material";
import PlaceholderBox from "../../../../common/UI/PlaceholderBox";
import AnswerCard from "./AnswerCard";
import AnswerCardSkeleton from "../../../../../app/layout/indicators/cards/AnswerCardSkeleton";
import { UserPaginationParams } from "../../../../../app/common/models/userPaginationParams";

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.only("xs")]: {
    "& .MuiGrid-item": {
      width: "100%",
    },
  },
  [theme.breakpoints.only("sm")]: {
    "& .MuiGrid-item": {
      width: "50%",
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .MuiGrid-item": {
      width: "33.33%",
    },
  },
}));

const AnswerList = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { exerciseStore, answerStore, userStore } = useStore();
  const { exerciseId } = useParams<{ exerciseId: string }>();

  useEffect(() => {
    if (exerciseId)
      exerciseStore.get(exerciseId).then(() => {
        console.log(new UserPaginationParams(1, 100, "", userStore.user?.id ?? ""))
        answerStore
          .loadExerciseAnswers(exerciseId, new UserPaginationParams(1, 100, userStore.isLecturer ? "" : userStore.user?.id ?? ""))
          .then(() => {
            setAnswers(answerStore.items);
          });
      });
  }, [exerciseId, exerciseStore, answerStore, userStore]);

  if (answerStore.isListLoading)
    return (
      <ResponsiveGrid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnswerCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnswerCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnswerCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnswerCardSkeleton />
        </Grid>
      </ResponsiveGrid>
    );

  return (
    <ResponsiveGrid container spacing={2}>
      {answers.length === 0 ? (
        <Box sx={{ width: "100%", ml: 2 }}>
          <PlaceholderBox
            title="Đây là danh sách câu trả lời của bài tập này"
            subtitle="Hiện chưa có câu trả lời!"
          />
        </Box>
      ) : (
        answers.map((a, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <AnswerCard key={index} answer={a} />
          </Grid>
        ))
      )}
    </ResponsiveGrid>
  );
};

export default observer(AnswerList);
