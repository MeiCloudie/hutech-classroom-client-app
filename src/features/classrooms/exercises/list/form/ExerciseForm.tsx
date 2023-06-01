import { Box, Typography } from "@mui/material";
import EntityForm from "../../../../common/forms/EntityForm";
import { useStore } from "../../../../../app/stores/store";

import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ExerciseFormValues } from "../../../../../app/models/Exercise";

interface ExerciseFormProps {
  handleClose: () => void;
}

const ExerciseForm = (props: ExerciseFormProps) => {
  const navigate = useNavigate();
  const { classroomId, exerciseId } = useParams<{
    classroomId: string;
    exerciseId: string;
  }>();
  const { exerciseStore } = useStore();
  const [exerciseFormValues, setExerciseFormValues] =
    useState<ExerciseFormValues>(new ExerciseFormValues());

  useEffect(() => {
    if (exerciseId)
      exerciseStore.get(exerciseId).then(() => {
        if (exerciseStore.selectedItem) {
          setExerciseFormValues(
            new ExerciseFormValues(exerciseStore.selectedItem)
          );
        }
      });
  }, [exerciseId, exerciseStore]);

  return (
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
        THÔNG TIN BÀI TẬP
      </Typography>
      <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
        <EntityForm<ExerciseFormValues>
          initialEntityFormValues={exerciseFormValues}
          selectionFields={[]}
          validateObject={{
            title: Yup.string()
              .required("Tiêu đề không được để trống!")
              .max(100, "Tiêu đề không được vượt quá 100 ký tự!"),
            topic: Yup.string().max(
              200,
              "Chủ đề không được vượt quá 200 ký tự!"
            ),
            instructor: Yup.string()
              .required("Hướng dẫn không được để trống!")
              .max(3000, "Hướng dẫn không được vượt quá 3000 ký tự!"),
            link: Yup.string().max(
              2000,
              "Nội dung không được vượt quá 2000 ký tự!"
            ),
            criteria: Yup.string().max(
              200,
              "Tiêu chí chấm điểm không được vượt quá 200 ký tự!"
            ),
            totalScore: Yup.number()
              .transform((value, originalValue) => {
                return originalValue === undefined ? 0 : value;
              })
              .required("Tổng điểm phải ở dạng số và không được để trống!"),
            deadline: Yup.date()
              .typeError("Deadline phải là một ngày theo định dạng dd/MM/yyyy hh:mm:ss!")
              .required("Deadline không được để trống!"),
          }}
          fieldConfigs={[
            {
              fieldKey: "title",
              props: {
                label: "Tiêu Đề",
                placeholder: "Hãy nhập tiêu đề tại đây!",
              },
            },
            {
              fieldKey: "topic",
              props: {
                label: "Chủ Đề",
                placeholder: "Hãy nhập chủ đề tại đây!",
              },
            },
            {
              fieldKey: "instruction",
              props: {
                label: "Hướng Dẫn",
                placeholder: "Hãy nhập nội dung hướng dẫn tại đây!",
                textarea: true,
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
              fieldKey: "criteria",
              props: {
                label: "Tiêu Chí Chấm Điểm",
                placeholder: "Hãy nhập nội dung tiêu chí chấm điểm tại đây!",
                textarea: true,
              },
            },
            {
              fieldKey: "totalScore",
              props: {
                label: "Tổng Điểm",
                placeholder: "Hãy nhập tổng điểm (dạng số) tại đây!",
              },
            },
            {
              fieldKey: "deadline",
              props: {
                label: "Thời Hạn",
                placeholder: "Hãy thêm thời hạn cho bài tập tại đây!",
              },
            },
          ]}
          excludeFields={["classroomId"]}
          onSubmit={(entityFormValues) => {
            if (entityFormValues.id) {
              exerciseStore
                .update(entityFormValues.id, entityFormValues)
                .then(() => {
                  // navigate(`/cr/${classroomId}/po/${exerciseId}`)
                  window.location.reload();
                  props.handleClose();
                });
            } else {
                exerciseStore.create(entityFormValues).then(() => {
                props.handleClose();
              });
            }
          }}
          onCancel={props.handleClose}
          onSetAdditionalValues={(exerciseFormValues) => {
            exerciseFormValues.classroomId = classroomId;
          }}
        />
      </Box>
    </Box>
  );
};

export default ExerciseForm;
