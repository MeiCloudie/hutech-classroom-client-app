import { Box, Typography } from "@mui/material";
import EntityForm from "../../../../common/forms/EntityForm";
import { Post, PostFormValues } from "../../../../../app/models/Post";
import { store, useStore } from "../../../../../app/stores/store";

import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

interface PostFormProps {
  handleClose: () => void;
  post?: Post;
}

const PostForm = (props: PostFormProps) => {
  const { classroomId, postId } = useParams<{
    classroomId: string;
    postId: string;
  }>();
  const { postStore } = useStore();
  const [postFormValues, setPostFormValues] = useState<PostFormValues>(
    new PostFormValues()
  );

  useEffect(() => {
    if (props.post) setPostFormValues(new PostFormValues(props.post));
    else if (postId)
      postStore.get(postId).then(() => {
        if (postStore.selectedItem) {
          setPostFormValues(new PostFormValues(postStore.selectedItem));
        }
      });
  }, [postId, postStore, props.post]);

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
              .required("Nội dung không được để trống!")
              .max(5000, "Nội dung không được vượt quá 5000 ký tự!"),
            link: Yup.string().max(
              2000,
              "Nội dung không được vượt quá 2000 ký tự!"
            ),
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
                rows: 5,
              },
            },
          ]}
          excludeFields={["classroomId", "userId"]}
          onSubmit={(entityFormValues) => {
            if (entityFormValues.id) {
              postStore
                .update(entityFormValues.id, entityFormValues)
                .then(() => {
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

export default observer(PostForm);
