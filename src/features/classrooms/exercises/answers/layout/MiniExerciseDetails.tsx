import { useEffect, useState } from "react";
import { useStore } from "../../../../../app/stores/store";
import { Exercise } from "../../../../../app/models/Exercise";
import { useParams } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";
import IconButtonTooltip from "../../../../common/UI/IconButtonTooltip";

import InfoIcon from "@mui/icons-material/Info";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import MiniExerciseDetailsSkeleton from "../../../../../app/layout/indicators/details/MiniExerciseDetailsSkeleton";

const MiniExerciseDetails = () => {
  const { exerciseStore } = useStore();
  const [exercise, setExercise] = useState<Exercise>(new Exercise());
  const { exerciseId, classroomId } = useParams<{
    classroomId: string;
    exerciseId: string;
  }>();

  useEffect(() => {
    if (exerciseId)
      exerciseStore.get(exerciseId).then(() => {
        console.log("Exercise: ", exerciseStore.selectedItem);
        if (exerciseStore.selectedItem) setExercise(exerciseStore.selectedItem);
      });
  }, [exerciseId, exerciseStore]);

    if (exerciseStore.isDetailsLoading) return <MiniExerciseDetailsSkeleton />;

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        p: 2,
        mt: 2,
        mb: 2,
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", pb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          Thông tin bài tập
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

        <IconButtonTooltip
          titleTooltip="Xem chi tiết"
          ariaLabel="exercise"
          icon={<InfoIcon />}
          link={`/cr/${classroomId}/ex/${exerciseId}`}
        />
      </Box>

      <Divider />

      <Box sx={{ m: "20px 0" }}>
        <Typography variant="h4" gutterBottom>
          {exercise.title}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ m: "20px 0" }}>
        <Typography
          variant="h6"
          sx={{
            color: (theme) => theme.palette.success.main,
            fontWeight: "bold",
          }}
          gutterBottom
        >
          Tổng điểm: {exercise.totalScore}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "red",
            fontWeight: "bold",
          }}
          gutterBottom
        >
          Thời hạn:{" "}
          {new Date(`${dayjs.utc(exercise.deadline)}`).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })}
        </Typography>
      </Box>
    </Box>
  );
};

export default observer(MiniExerciseDetails);
