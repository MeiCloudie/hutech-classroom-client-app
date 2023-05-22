import { Formik } from "formik";
import { ChangePasswordFormValues } from "../../../app/models/User";
import * as Yup from "yup";

import { Box, Button, Stack } from "@mui/material";

import React from "react";

import { useStore } from "../../../app/stores/store";
import MyPasswordForm from "../../common/MyPasswordForm";
import SnackbarAlert from "../../common/SnackbarAlert";

const ChangePasswordForm = () => {
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const { userStore } = useStore();

  //   const handleClick = () => {
  //     if (isSuccess) {
  //       setIsSuccess(false);
  //     } else {
  //       setIsSuccess(true);
  //     }
  //     setOpen(true);
  //   };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "click away") {
      return;
    }

    setOpen(false);
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Phải điền mật khẩu hiện tại!"),
    newPassword: Yup.string()
      .notOneOf(
        [Yup.ref("password")],
        "Mật khẩu mới và mật khẩu hiện tại giống nhau!"
      )
      .required("Hãy điền mật khẩu mới!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Mật khẩu xác nhận phải trùng với mật khẩu mới!")
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
            setIsSuccess(true);
            actions.resetForm();
          } else {
            setIsSuccess(false);
          }
          setOpen(true);
          actions.setSubmitting(false);
        });
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { mt: 1, mb: 1, width: "100ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <MyPasswordForm label="Mật khẩu hiện tại" name="password" />
          <MyPasswordForm label="Mật khẩu mới" name="newPassword" />
          <MyPasswordForm label="Mật khẩu xác nhận" name="confirmPassword" />

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
                  //   onClick={handleClick}
                >
                  THAY ĐỔI MẬT KHẨU
                </Button>
              </Stack>
            </div>

            {!isSuccess && (
              <SnackbarAlert
                severity="warning"
                title="CẢNH BÁO"
                content="Mật khẩu hiện tại không đúng hoặc mật khẩu mới không đúng theo đúng định dạng."
                contentStrong="Hãy tiến hành nhập lại!"
                open={open}
                handleClose={handleClose}
              />
            )}

            {isSuccess && (
              <SnackbarAlert
                severity="success"
                title="THÀNH CÔNG"
                content="Đã thay đổi mật khẩu thành công!"
                open={open}
                handleClose={handleClose}
              />
            )}
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
