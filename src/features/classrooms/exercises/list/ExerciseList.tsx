import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useStore } from "../../../../app/stores/store";
import { PaginationParams } from "../../../../app/common/models/paginationPrams";
import { observer } from "mobx-react-lite";
import PostCardSkeleton from "../../../../app/layout/indicators/cards/PostCardSkeleton";
import PlaceholderBox from "../../../common/UI/PlaceholderBox";
import { Exercise } from "../../../../app/models/Exercise";
import ExerciseCard from "./ExerciseCard";

const ExerciseList = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const { classroomStore, exerciseStore } = useStore();
  const { classroomId } = useParams<{ classroomId: string }>();

  useEffect(() => {
    if (classroomId)
      classroomStore.get(classroomId).then(() => {
        exerciseStore
          .loadClassroomExercises(classroomId, new PaginationParams(1, 100))
          .then(() => {
            setExercises(exerciseStore.items);
          });
      });
  }, [classroomId, classroomStore, exerciseStore]);

  if (exerciseStore.isListLoading)
    return (
      <>
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </>
    );

  return (
    <Box>
      {exercises.length === 0 ? (
        <PlaceholderBox
          title="Đây là nơi xem danh sách bài tập của lớp học"
          subtitle="Hiện lớp học chưa có bài tập!"
        />
      ) : (
        exercises.map((e, index) => <ExerciseCard key={index} exercise={e} />)
      )}
    </Box>
  );
};

export default observer(ExerciseList);
