import { Box, Chip, Divider, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";

import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../../../app/stores/store";
import { Answer } from "../../../../../../app/models/Answer";
import AlertDialog from "../../../../../common/UI/AlertDialog";
import CreateEditDialog from "../../../../../common/UI/CreateEditDialog";
import AnswerForm from "../../form/AnswerForm";
import { Link as MuiLink } from "@mui/material";

const AnswerDetails = () => {
  const { answerStore } = useStore();
  const [answer, setAnswer] = useState<Answer>(new Answer());
  const { answerId, classroomId, exerciseId } = useParams<{
    classroomId: string;
    answerId: string;
    exerciseId: string;
  }>();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (answerId)
      answerStore
        .delete(answerId)
        .then(() => navigate(`/cr/${classroomId}/ex/${exerciseId}/all`));
  };

  useEffect(() => {
    if (answerId)
      answerStore.get(answerId).then(() => {
        console.log("Answer: ", answerStore.selectedItem);
        if (answerStore.selectedItem) setAnswer(answerStore.selectedItem);
      });
  }, [answerId, answerStore]);

  //   if (answerStore.isDetailsLoading) return <AnswerDetailsSkeleton />;

  return (
    <Box>
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
            CHI TIẾT CÂU TRẢ LỜI
          </Typography>

          <Box sx={{ display: "flex" }}>
            <AlertDialog
              iconButton={<DeleteIcon />}
              titleButton="XOÁ"
              alertDialogTitle="Xoá câu trả lời?"
              alertDialogDescription="Bạn có chắc chắn xoá câu trả lời này?"
              negation="Huỷ"
              affirmation="Xoá"
              onSubmit={handleSubmit}
            />
            <CreateEditDialog
              iconButton={<EditIcon />}
              titleButton="CHỈNH SỬA"
              titleDialog="CHỈNH SỬA CÂU TRẢ LỜI"
              formComponent={(handleClose) => (
                <AnswerForm answer={answer} handleClose={handleClose} />
              )}
            />
          </Box>
        </Box>

        <Box
          sx={{
            mb: 1,
          }}
        >
          <Typography variant="body1" gutterBottom>
            <strong>{`${answer.user?.firstName} ${answer.user?.lastName}`}</strong>
          </Typography>

          <Typography variant="body1" color="gray" gutterBottom>
            Đã nộp lúc:{" "}
            {new Date(`${answer.createDate}Z`).toLocaleString("vi-VN", {
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

        <Divider color="#1976d2" />

        <Box sx={{ mt: 2, mb: 2 }}>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ mr: 1 }}
              gutterBottom
            >
              <strong>Điểm:</strong>
            </Typography>
            {answer.score === 0 ? (
              <Chip label="Chưa chấm" color="primary" size="small" />
            ) : (
              <Chip label={`${answer.score}/${answer.exercise?.totalScore}`} color="success" size="small" />
            )}
          </Box>

          <Divider />

          <Typography
            variant="subtitle1"
            fontWeight={700}
            color="primary"
            sx={{ mt: 1 }}
            gutterBottom
          >
            Mô tả:
          </Typography>
          {answer.description === "" ? (
            <em>
              <Typography variant="body2" gutterBottom>
                - Không có -
              </Typography>
            </em>
          ) : (
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: answer.description }}
              style={{ padding: "0" }}
            ></Typography>
          )}
        </Box>

        <Divider />

        {answer.link && answer.link.trim() !== "" && (
          <Box sx={{ mt: 1, mb: 1 }}>
            <Box sx={{ display: "flex" }}>
              <Typography variant="subtitle1" fontWeight={700} color="primary">
                Link:
              </Typography>
            </Box>

            <Box>
              <ol>
                {answer.link
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
                          <Typography variant="body2" color="text.secondary">
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

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 2, mb: 2 }}
            component={Link}
            to={`/cr/${classroomId}/ex/${exerciseId}/answers/all`}
          >
            Quay Về
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default observer(AnswerDetails);
