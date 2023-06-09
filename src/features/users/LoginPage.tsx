import {
  Alert,
  AlertTitle,
  Box,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import LoginForm from "./forms/LoginForm";

const LoginPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "#f5f5f5",
        display: "flex",
        p: 2,
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={5} key="logo-hutech-classroom">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              m: "150px 30px",
            }}
          >
            <CardMedia
              component="img"
              image="logo-hutech-classroom.png"
              alt="Ảnh không tồn tại"
              sx={{}}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={8} lg={7} key="login-form">
          <Box
            sx={{
              p: 2,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LoginForm />
            </Box>

            <Alert
              severity="info"
              sx={{
                m: "20px auto",
                textAlign: "start",
                width: "100%",
                maxWidth: "115ch",
              }}
            >
              <AlertTitle>Hệ Thống</AlertTitle>
              Đăng nhập không được? Cập nhật lại thông tin tại{" "}
              <a
                href="https://sinhvien.hutech.edu.vn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trang Sinh Viên
              </a>{" "}
              hoặc liên hệ Phòng Đào Tạo - Khảo Thí{" "}
              <strong>daotao@hutech.edu.vn</strong>
            </Alert>

            <Typography variant="body1">
              Version 1.0.0
              <br />© 2023 Khoa Công nghệ thông tin - Trường ĐH Công nghệ TP.HCM
              HUTECH
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
