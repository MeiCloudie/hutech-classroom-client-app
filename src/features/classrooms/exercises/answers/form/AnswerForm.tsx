import { Box, Divider, Typography } from "@mui/material";

import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Answer, AnswerFormValues } from "../../../../../app/models/Answer";
import { useStore } from "../../../../../app/stores/store";
import EntityForm from "../../../../common/forms/EntityForm";
import { InputType } from "../../../../../app/layout/enums/InputTypes";

interface AnswerFormProps {
  handleClose: () => void;
  answer?: Answer;
}

const AnswerForm = (props: AnswerFormProps) => {
  const { exerciseId, answerId } = useParams<{
    exerciseId: string;
    answerId: string;
  }>();
  const { answerStore } = useStore();
  const [answerFormValues, setAnswerFormValues] = useState<AnswerFormValues>(
    new AnswerFormValues()
  );

  useEffect(() => {
    if (props.answer) setAnswerFormValues(new AnswerFormValues(props.answer));
    else if (answerId)
      answerStore.get(answerId).then(() => {
        if (answerStore.selectedItem) {
          setAnswerFormValues(new AnswerFormValues(answerStore.selectedItem));
        }
      });
  }, [answerId, answerStore, props.answer]);

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
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
            textAlign: "center",
          }}
        >
          THÔNG TIN CÂU TRẢ LỜI
        </Typography>

        {/* info exercise */}
        <Divider />
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
          <EntityForm<AnswerFormValues>
            initialEntityFormValues={answerFormValues}
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
                  return originalValue === undefined ? 0 : value;
                })
                .typeError("Điểm phải ở dạng số!"),
            }}
            fieldConfigs={[
              {
                fieldKey: "description",
                props: {
                  label: "Mô tả câu trả lời",
                  placeholder: "Hãy nhập mô tả câu trả lời tại đây!",
                  type: InputType.Textarea,
                },
              },
              {
                fieldKey: "link",
                props: {
                  label: "Liên Kết",
                  placeholder: "Hãy thêm đường dẫn liên kết tại đây!",
                  rows: 5,
                },
              },
              {
                fieldKey: "score",
                props: {
                  label: "Điểm số",
                  placeholder: "Hãy thêm điểm số bài tập tại đây!",
                },
              },
            ]}
            excludeFields={["exerciseId", "userId"]}
            onSubmit={(entityFormValues) => {
              if (entityFormValues.id) {
                answerStore
                  .update(entityFormValues.id, entityFormValues)
                  .then(() => {
                    props.handleClose();
                  });
              } else {
                answerStore.create(entityFormValues).then(() => {
                  props.handleClose();
                });
              }
            }}
            onCancel={props.handleClose}
            onSetAdditionalValues={(answerFormValues) => {
              answerFormValues.exerciseId = exerciseId;
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AnswerForm;
