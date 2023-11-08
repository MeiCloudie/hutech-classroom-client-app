import {
  Alert,
  AlertTitle,
  Box,
  CardMedia,
  Typography,
} from "@mui/material"
import LoginForm from "./forms/LoginForm"

const LoginPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image="logo-hutech-classroom.png"
          alt="Ảnh không tồn tại"
          sx={{ width: 400, height: "auto" }}
        />
        <Typography variant="h5" fontWeight={"bold"}>
          HỆ THỐNG QUẢN LÝ PHÒNG HỌC
        </Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          justifyContent: "center",
          textAlign: "center",
          mt: 8,
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
            mx: "auto",
            mt: "50px",
            mb: "20px",
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

        <Typography variant="body1" color={"gray"}>Version 1.0.0</Typography>
      </Box>
    </Box>
  )
}

export default LoginPage
