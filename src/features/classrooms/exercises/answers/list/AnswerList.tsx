import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { Answer } from "../../../../../app/models/Answer";
import { useStore } from "../../../../../app/stores/store";
import { useParams } from "react-router-dom";
import { PaginationParams } from "../../../../../app/common/models/paginationPrams";
import { Box } from "@mui/material";
import PlaceholderBox from "../../../../common/UI/PlaceholderBox";
import AnswerCard from "./AnswerCard";
import AnswerCardSkeleton from "../../../../../app/layout/indicators/cards/AnswerCardSkeleton";

const AnswerList = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { exerciseStore, answerStore } = useStore();
  const { exerciseId } = useParams<{ exerciseId: string }>();

  useEffect(() => {
    if (exerciseId)
      exerciseStore.get(exerciseId).then(() => {
        answerStore
          .loadExerciseAnswers(exerciseId, new PaginationParams(1, 100))
          .then(() => {
            setAnswers(answerStore.items);
          });
      });
  }, [exerciseId, exerciseStore, answerStore]);

    if (answerStore.isListLoading)
      return (
        <>
          <AnswerCardSkeleton />
          <AnswerCardSkeleton />
          <AnswerCardSkeleton />
        </>
      );

  return (
    <Box>
      {answers.length === 0 ? (
        <PlaceholderBox
          title="Đây là danh sách câu trả lời của bài tập này"
          subtitle="Hiện chưa có câu trả lời!"
        />
      ) : (
        answers.map((a, index) => <AnswerCard key={index} answer={a} />)
      )}
    </Box>
  );
};

export default observer(AnswerList);
