import { Formik } from "formik";
import MyPasswordInput from "../../common/forms/MyPasswordInput";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import * as Yup from "yup";
import { useStore } from "../../../app/stores/store";
import MyTextInput from "../../common/forms/MyTextInput";
import { toast } from "react-toastify";
import { blue } from "@mui/material/colors";

const LoginForm = () => {
  const { userStore } = useStore();
  const validationSchema = Yup.object({
    userName: Yup.string().required("Hãy nhập tên đăng nhập!"),
    password: Yup.string()
      .required("Hãy nhập mật khẩu")
      .min(8, "Mật khẩu phải tối thiểu 8 ký tự!"),
  });
  return (
    <Formik
      key="login-form"
      initialValues={{ userName: "", password: "", error: null }}
      onSubmit={(loginFormValues, actions) => {
        userStore.login(loginFormValues).then(() => {
          toast.success("Đăng nhập thành công!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
        actions.setSubmitting(false);
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
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: blue[800],
            }}
          >
            ĐĂNG NHẬP
          </Typography>

          <MyTextInput
            helperText={errors.userName}
            name="userName"
            label="Tài khoản"
            placeholder="Hãy nhập tài khoản của bạn"
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
                justifyContent: "end",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 2, mr: 0 }}
                size="large"
              >
                Đăng nhập
              </Button>
            </div>
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default LoginForm;
