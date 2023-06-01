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

const ExerciseDetails = () => {
  const { exerciseStore } = useStore();
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
        console.log("Exercise: ", exerciseStore.selectedItem);
        if (exerciseStore.selectedItem) setExercise(exerciseStore.selectedItem);
      });
  }, [exerciseId, exerciseStore]);

  if (exerciseStore.isDetailsLoading) return <ExerciseDetailsSkeleton />;

  return (
    <Box>
      <MiniDetailsLayout
        component={
          <Box
            sx={{
              bgcolor: "#f5f5f5",
              p: 2,
              mb: 2,
              border: "1px solid #e8e8e8",
              borderRadius: "5px",
              transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
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
                  iconButton={<DeleteIcon />}
                  titleButton="XOÁ"
                  alertDialogTitle="Xoá bài tập?"
                  alertDialogDescription="Câu trả lời cũng sẽ bị xoá"
                  negation="Huỷ"
                  affirmation="Xoá"
                  onSubmit={handleSubmit}
                />
                <CreateEditDialog
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

            <Typography variant="body1" color="gray" mb={2}>
              <strong>
                {`${exercise.title}${
                  exercise.topic && ` - Chủ đề: ${exercise.topic}`
                }`}
              </strong>
              <br />
              {exercise.createDate.toString()}
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
                <Typography variant="body2" gutterBottom>
                  <strong>Thời hạn:</strong> {exercise.deadline.toString()}
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
                  color="text.secondary"
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
                                      color="text.secondary"
                                      sx={{ m: 1 }}
                                    >
                                      {link}
                                    </Typography>
                                  </em>
                                </MuiLink>
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
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
                color="text.secondary"
                dangerouslySetInnerHTML={{ __html: exercise.criteria }}
                style={{ padding: "0" }}
              ></Typography>
            </Box>

            <Divider />

            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              sx={{ mt: 2, mb: 2 }}
              component={Link}
              to={`/cr/${classroomId}/exercises`}
            >
              Quay Về
            </Button>
          </Box>
        }
      />
    </Box>
  );
};

export default observer(ExerciseDetails);
