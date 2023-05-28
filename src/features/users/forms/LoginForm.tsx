import { Formik } from "formik";
import MyPasswordInput from "../../common/forms/MyPasswordInput";
import { Box, Button, InputAdornment, Stack } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import * as Yup from "yup";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../common/forms/MyTextInput";

const LoginForm = () => {
  const { userStore } = useStore();
  const validationSchema = Yup.object({
    userName: Yup.string().required("Hãy nhập tên đăng nhập"),
    password: Yup.string().required("Hãy nhập mật khẩu"),
  });
  return (
    <Formik
      key="login-form"
      initialValues={{ userName: "", password: "", error: null }}
      onSubmit={(loginFormValues, actions) => {
        userStore
          .login(loginFormValues)
          .catch((e) => actions.setSubmitting(false));
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, handleChange, isSubmitting, errors }) => (
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <MyTextInput
            helperText={errors.userName}
            name="userName"
            label="Email/Username"
            placeholder="Enter your email or username here!"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleRoundedIcon />
                </InputAdornment>
              ),
            }}
          />

          <MyPasswordInput
            label="Mật khẩu"
            name="password"
            placeholder="Nhập mật khẩu của bạn"
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
                  Đăng nhập
                </Button>
              </Stack>
            </div>
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default LoginForm;
