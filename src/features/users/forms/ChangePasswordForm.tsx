import { Formik } from "formik";
import { ChangePasswordFormValues } from "../../../app/models/User";
import * as Yup from "yup";
import { Box, Button, Stack } from "@mui/material";
import { useStore } from "../../../app/stores/store";
import MyPasswordInput from "../../common/forms/MyPasswordInput";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const { userStore } = useStore();

  const validationSchema = Yup.object({
    password: Yup.string().required("Phải điền mật khẩu hiện tại!"),
    newPassword: Yup.string()
      .notOneOf(
        [Yup.ref("password")],
        "Mật khẩu mới và mật khẩu hiện tại giống nhau!"
      )
      .required("Hãy điền mật khẩu mới!"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword")],
        "Mật khẩu xác nhận phải trùng với mật khẩu mới!"
      )
      .required("Phải điền mật khẩu xác nhận!"),
  });
  return (
    <Formik
      key="change-password-form"
      initialValues={{ password: "", newPassword: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={(
        changePasswordFormValues: ChangePasswordFormValues,
        actions
      ) => {
        userStore.changePassword(changePasswordFormValues).then((isSuccess) => {
          if (isSuccess) {
            toast.success("Đã thay đổi mật khẩu thành công!", {
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
              "Mật khẩu hiện tại không đúng hoặc mật khẩu mới không đúng theo đúng định dạng!",
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
          <MyPasswordInput label="Mật khẩu hiện tại" name="password" />
          <MyPasswordInput label="Mật khẩu mới" name="newPassword" />
          <MyPasswordInput label="Mật khẩu xác nhận" name="confirmPassword" />

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
                  THAY ĐỔI MẬT KHẨU
                </Button>
              </Stack>
            </div>
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
