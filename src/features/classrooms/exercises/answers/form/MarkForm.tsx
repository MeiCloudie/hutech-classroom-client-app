import { Box, Typography } from "@mui/material";

import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { Answer, AnswerFormValues } from "../../../../../app/models/Answer";
import { useStore } from "../../../../../app/stores/store";
import EntityForm from "../../../../common/forms/EntityForm";

interface MarkFormProps {
  answer: Answer;
}

const MarkForm = (props: MarkFormProps) => {
  const { exerciseId } = useParams<{
    exerciseId: string;
    answerId: string;
  }>();
  const { answerStore, userStore } = useStore();

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          width: "100%",
          p: 2,
          border: "1px solid #e8e8e8",
          borderRadius: "5px",
          transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
            transform: "translateY(-4px)",
          },
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
          CHẤM ĐIỂM
        </Typography>
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
          <EntityForm<AnswerFormValues>
            initialEntityFormValues={new AnswerFormValues(props.answer)}
            selectionFields={[]}
            validateObject={{
              description: Yup.string().max(
                500,
                "Mô tả không được vượt quá 500 ký tự!"
              ),
              link: Yup.string().max(
                2000,
                "Nội dung không được vượt quá 2000 ký tự!"
              ),
              score: Yup.number()
                .transform((value, originalValue) => {
                  return originalValue === undefined ? -1 : value;
                })
                .typeError("Điểm phải ở dạng số!"),
            }}
            fieldConfigs={[
              {
                fieldKey: "score",
                props: {
                  label: "Điểm số",
                  placeholder: "Hãy thêm điểm số bài tập tại đây!",
                },
              },
            ]}
            excludeFields={[
              "exerciseId",
              "userId",
              "description",
              "link",
              "id",
            ]}
            onSubmit={(entityFormValues) => {
              console.log(entityFormValues);
              if (entityFormValues.id) {
                answerStore.update(entityFormValues.id, entityFormValues);
              } else {
                answerStore.create(entityFormValues);
              }
            }}
            onCancel={() => props.answer.score = -1}
            onSetAdditionalValues={(answerFormValues) => {
              answerFormValues.exerciseId = exerciseId;
              answerFormValues.userId = userStore.user?.id;
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MarkForm;
