import { Formik } from "formik";
import * as Yup from "yup";
import { useStore } from "../../../../../app/stores/store";
import { useNavigate, useParams } from "react-router-dom";
import { PostFormValues } from "../../../../../app/models/Post";
import { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import MyTextInput from "../../../../common/forms/MyTextInput";

import LinkIcon from '@mui/icons-material/Link';
import MyTextAreaInput from "../../../../common/forms/MyTextAreaInput";

const PostForm = () => {
  const { postStore } = useStore();
  const navigate = useNavigate();

  const {
    get,
    // loadingInitial,
    create,
    update,
  } = postStore;

  const { classroomId, postId } = useParams<{
    classroomId: string;
    postId: string;
  }>();

  const [post, setPost] = useState<PostFormValues>(new PostFormValues());

  const validationSchema = Yup.object({
    content: Yup.string().required("Hãy nhập nội dung"),
  });

  useEffect(() => {
    if (postId) get(postId).then((post) => setPost(new PostFormValues(post)));
  }, [postId, get]);

  const handleFormSubmit = (post: PostFormValues) => {
    if (!post.id) {
      let newPost = {
        ...post,
      };
      post.classroomId = classroomId;
      create(post).then(() =>
        navigate(`cr/${classroomId}/posts/${newPost.id}`)
      );
    } else {
      update(post.id, post).then(() =>
        navigate(`cr/${classroomId}/posts/${post.id}`)
      );
    }
  };

  //   if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Formik
      key="post-form"
      initialValues={post}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <MyTextAreaInput
            name="content"
            label="Nội Dung"
            placeholder="Hãy nhập nội dung tại đây!"
            multiline
            rows={4}
          />

          <MyTextInput
            name="link"
            label="Liên Kết"
            placeholder="Hãy thêm liên kết tại đây!"
            icon={<LinkIcon />}
          />

          <Stack sx={{ width: "100%" }} spacing={2}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Stack spacing={2} direction="row">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ m: "10px 0" }}
                >
                  TẠO BÀI ĐĂNG
                </Button>
              </Stack>
            </div>
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default PostForm;
