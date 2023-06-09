import { Alert, AlertTitle, Box, CardMedia, Typography } from "@mui/material";
import { store } from "../../app/stores/store";

const ProfilePage = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        display: "flex",
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image="logoHutech.png"
          alt="Ảnh không tồn tại"
          sx={{
            width: "150px",
            height: "auto",
            margin: "10px 80px",
          }}
        />
      </Box>

      <Box sx={{ textAlign: "start" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
            textAlign: "start",
            marginBottom: 2,
          }}
        >
          Hồ sơ cá nhân:
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
        >{`Họ tên: ${store.userStore.user?.firstName} ${store.userStore.user?.lastName}`}</Typography>
        <Typography variant="subtitle1" gutterBottom>
          Mã số: <strong>{store.userStore.user?.userName}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Email: <strong>{store.userStore.user?.email}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Khoa/Viện: <strong>Khoa {store.userStore.user?.faculty?.name}</strong>
        </Typography>

        <Alert severity="info" sx={{ mt: 2 }}>
          <AlertTitle>Hệ Thống</AlertTitle>
          Cập nhật thông tin liên lạc tại{" "}
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
      </Box>
    </Box>
  );
};

export default ProfilePage;
