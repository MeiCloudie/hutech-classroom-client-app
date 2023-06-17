import MiniDetailsLayout from "../../layout/MiniDetailsLayout";
import { Box, Divider, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { useStore } from "../../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import CreateEditDialog from "../../../common/UI/CreateEditDialog";
import AlertDialog from "../../../common/UI/AlertDialog";
import { observer } from "mobx-react-lite";
import { Link as MuiLink } from "@mui/material";
import { Exercise } from "../../../../app/models/Exercise";
import ExerciseForm from "../list/form/ExerciseForm";
import ExerciseDetailsSkeleton from "../../../../app/layout/indicators/details/ExerciseDetailsSkeleton";
import AnswerForm from "../answers/form/AnswerForm";
import dayjs from "dayjs";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PublishIcon from "@mui/icons-material/Publish";
import AnswerCard from "../answers/list/AnswerCard";
import { UserPaginationParams } from "../../../../app/common/models/userPaginationParams";
import PlaceholderBox from "../../../common/UI/PlaceholderBox";

const ExerciseDetails = () => {
  const { exerciseStore, userStore, answerStore } = useStore();
  const [exercise, setExercise] = useState<Exercise>(new Exercise());
  const { exerciseId, classroomId } = useParams<{
    classroomId: string;
    exerciseId: string;
  }>();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (exerciseId)
      exerciseStore
        .delete(exerciseId)
        .then(() => navigate(`/cr/${classroomId}/exercises`));
  };

  useEffect(() => {
    if (exerciseId)
      exerciseStore.get(exerciseId).then(() => {
        answerStore
          .loadExerciseAnswers(
            exerciseId,
            new UserPaginationParams(
              1,
              100,
              userStore.isLecturer ? "" : userStore.user?.id ?? ""
            )
          )
          .then(() => {
            if (exerciseStore.selectedItem)
              setExercise(exerciseStore.selectedItem);
          });
      });
  }, [
    answerStore,
    exerciseId,
    exerciseStore,
    userStore.isLecturer,
    userStore.user?.id,
  ]);

  if (exerciseStore.isDetailsLoading) return <ExerciseDetailsSkeleton />;

  return (
    <Box>
      <MiniDetailsLayout
        component={
          <Box>
            <Box
              sx={{
                bgcolor: "#f5f5f5",
                p: 2,
                mb: 2,
                border: "1px solid #e8e8e8",
                borderRadius: "5px",
                transition:
                  "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                  transform: "translateY(-4px)",
                },
                textAlign: "start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: (theme) => theme.palette.primary.main,
                    textAlign: "start",
                  }}
                >
                  CHI TIẾT BÀI TẬP
                </Typography>

                <Box sx={{ display: "flex" }}>
                  <AlertDialog
                    disabled={!userStore.isLecturer}
                    iconButton={<DeleteIcon />}
                    titleButton="XOÁ"
                    alertDialogTitle="Xoá bài tập?"
                    alertDialogDescription="Câu trả lời cũng sẽ bị xoá"
                    negation="Huỷ"
                    affirmation="Xoá"
                    onSubmit={handleSubmit}
                  />
                  <CreateEditDialog
                    disabled={!userStore.isLecturer}
                    iconButton={<EditIcon />}
                    titleButton="CHỈNH SỬA"
                    titleDialog="CHỈNH SỬA BÀI TẬP"
                    formComponent={(handleClose) => (
                      <ExerciseForm
                        exercise={exercise}
                        handleClose={handleClose}
                      />
                    )}
                  />
                </Box>
              </Box>

              <Typography variant="body1" gutterBottom>
                <strong>
                  {`${exercise.title}${
                    exercise.topic && ` - Chủ đề: ${exercise.topic}`
                  }`}
                </strong>
              </Typography>

              <Typography variant="body1" color="gray" gutterBottom mb={1}>
                {new Date(`${exercise.createDate}Z`).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </Typography>

              <Divider color="#1976d2" />

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    <strong>Tổng điểm:</strong> {exercise.totalScore}
                  </Typography>
                  <Typography variant="body2" color="red" gutterBottom>
                    <strong>Thời hạn:</strong>{" "}
                    {new Date(`${dayjs.utc(exercise.deadline)}`).toLocaleString(
                      "vi-VN",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      }
                    )}
                  </Typography>
                </Box>

                <Divider />

                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="primary"
                    gutterBottom
                  >
                    Hướng Dẫn:
                  </Typography>
                  <Typography
                    variant="body2"
                    dangerouslySetInnerHTML={{
                      __html: exercise.instruction,
                    }}
                    style={{ padding: "0" }}
                  ></Typography>
                </Box>
                <Divider />

                {exercise.link && exercise.link.trim() !== "" && (
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      color="primary"
                      gutterBottom
                    >
                      Link:
                    </Typography>

                    <Box>
                      <ol>
                        {exercise.link
                          .trim()
                          .split(/\s+/)
                          .map((link, index) => (
                            <li key={index}>
                              <Box>
                                {link.startsWith("https://") ||
                                link.startsWith("http://") ? (
                                  <MuiLink
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    <em>
                                      <Typography
                                        variant="body2"
                                        fontWeight={700}
                                        sx={{ m: 1 }}
                                      >
                                        {link}
                                      </Typography>
                                    </em>
                                  </MuiLink>
                                ) : (
                                  <Typography variant="body2">
                                    {link}
                                  </Typography>
                                )}
                              </Box>
                            </li>
                          ))}
                      </ol>
                    </Box>
                  </Box>
                )}
              </Box>

              <Divider />

              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color="primary"
                  gutterBottom
                >
                  Tiêu Chí Chấm Điểm:
                </Typography>
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: exercise.criteria }}
                  style={{ padding: "0" }}
                ></Typography>
              </Box>

              <Divider />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  sx={{ mt: 2, mb: 2 }}
                  component={Link}
                  to={`/cr/${classroomId}/exercises`}
                >
                  Quay Về
                </Button>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box sx={{ mt: 2, mr: 1 }}>
                    <CreateEditDialog
                      hidden={!userStore.isStudent}
                      disabled={
                        dayjs.utc(exercise.deadline).isBefore(dayjs())
                          ? true
                          : false
                      }
                      iconButton={<PublishIcon />}
                      titleButton="NỘP BÀI"
                      titleDialog="TẠO CÂU TRẢ LỜI"
                      formComponent={(handleClose) => (
                        <AnswerForm handleClose={handleClose} />
                      )}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<FactCheckIcon />}
                    sx={{ mt: 2, mb: 2 }}
                    component={Link}
                    to={`/cr/${classroomId}/ex/${exerciseId}/answers/all`}
                  >
                    Kết Quả
                  </Button>
                </Box>
              </Box>
            </Box>
            {!userStore.isLecturer && (
              <Box
                sx={{
                  bgcolor: "#f5f5f5",
                  p: 2,
                  border: "1px solid #e8e8e8",
                  borderRadius: "5px",
                  transition:
                    "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {answerStore.items.length === 0 ? (
                  <PlaceholderBox
                    title="Đây là danh sách câu trả lời của bài tập này"
                    subtitle="Hiện chưa có câu trả lời!"
                  />
                ) : (
                  answerStore.items.map((a, index) => (
                    <Box sx={{ mb: 2 }}>
                      <AnswerCard key={index} answer={a} />
                    </Box>
                  ))
                )}
              </Box>
            )}
          </Box>
        }
      />
    </Box>
  );
};

export default observer(ExerciseDetails);
