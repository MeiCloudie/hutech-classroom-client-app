import { Box, Typography } from "@mui/material";
import EntityForm from "../../../../common/forms/EntityForm";
import { PostFormValues } from "../../../../../app/models/Post";
import { store, useStore } from "../../../../../app/stores/store";

import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface PostFormProps {
  handleClose: () => void;
}

const PostForm = (props: PostFormProps) => {
  const navigate = useNavigate()
  const { classroomId, postId } = useParams<{
    classroomId: string;
    postId: string;
  }>();
  const { postStore } = useStore();
  const [postFormValues, setPostFormValues] = useState<PostFormValues>(
    new PostFormValues()
  );

  useEffect(() => {
    if (postId) postStore.get(postId).then(() => {
      if (postStore.selectedItem) {
        setPostFormValues(new PostFormValues(postStore.selectedItem))
      }
    });
  }, [postId, postStore]);

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
        THÔNG TIN BÀI ĐĂNG
      </Typography>
      <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
        <EntityForm<PostFormValues>
          initialEntityFormValues={postFormValues}
          selectionFields={[]}
          validateObject={{
            content: Yup.string()
              .required("Hãy nhập nội dung!")
              .max(2000, "Nội dung không được vượt quá 100 ký tự!"),
          }}
          fieldConfigs={[
            {
              fieldKey: "content",
              props: {
                label: "Nội Dung",
                placeholder: "Hãy nhập nội dung bài đăng tại đây!",
                textarea: true,
              },
            },
            {
              fieldKey: "link",
              props: {
                label: "Liên Kết",
                placeholder: "Hãy thêm đường dẫn liên kết tại đây!",
              },
            },
          ]}
          excludeFields={["classroomId", "userId"]}
          onSubmit={(entityFormValues) => {
            if (entityFormValues.id) {
              postStore
                .update(entityFormValues.id, entityFormValues)
                .then(() => {
                  // navigate(`/cr/${classroomId}/po/${postId}`)
                  props.handleClose();

                });
            } else {
              postStore.create(entityFormValues).then(() => {
                props.handleClose();
              });
            }
          }}
          onCancel={props.handleClose}
          onSetAdditionalValues={(postFormValues) => {
            postFormValues.userId = store.userStore.user?.id;
            postFormValues.classroomId = classroomId;
          }}
        />
      </Box>
    </Box>
  );
};

export default PostForm;
