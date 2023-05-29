import { Box, Typography } from "@mui/material";
import EntityForm from "../../../../common/forms/EntityForm";
import { Post, PostFormValues } from "../../../../../app/models/Post";
import { store } from "../../../../../app/stores/store";

import * as Yup from "yup";
import { useParams } from "react-router-dom";

interface PostFormProps {
  handleClose: () => void;
}

const PostForm = (props: PostFormProps) => {
  const { classroomId } = useParams<{ classroomId: string }>();

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
      <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center"}}>
        <EntityForm<Post, PostFormValues>
          entityStore={store.postStore}
          toFormValues={(entity) => new PostFormValues(entity)}
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
          onCreate={props.handleClose}
          onUpdate={props.handleClose}
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
