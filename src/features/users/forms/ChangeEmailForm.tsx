import { Formik } from "formik";
import { ChangeEmailFormValues } from "../../../app/models/User";
import * as Yup from "yup";
import { Box, Button, Stack } from "@mui/material";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../common/forms/MyTextInput";
import { toast } from "react-toastify";

const ChangeEmailForm = () => {
  const { userStore } = useStore();

  const validationSchema = Yup.object({
    newEmail: Yup.string()
      .email()
      .required("Hãy điền email mới!")
  });
  return (
    <Formik
      key="change-email-form"
      initialValues={{ password: "", newEmail: "", confirmEmail: "" }}
      validationSchema={validationSchema}
      onSubmit={(
        changeEmailFormValues: ChangeEmailFormValues,
        actions
      ) => {
        userStore.changeEmail(changeEmailFormValues).then((isSuccess) => {
          if (isSuccess) {
            toast.success("Đã thay đổi email thành công!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            actions.resetForm();
          } else {
            toast.error(
              "Email mới không đúng theo đúng định dạng!",
              {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              }
            );
          }
          actions.setSubmitting(false);
        });
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <MyTextInput label="Email mới" name="newEmail" />

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
                  THAY ĐỔI EMAIL
                </Button>
              </Stack>
            </div>
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default ChangeEmailForm;
