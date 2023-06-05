import { Typography, Box, Alert, AlertTitle } from "@mui/material";
import AccountForm from "../forms/AccountForm";
import { useStore } from "../../../app/stores/store";

const AccountInfoTab = () => {
  const { userStore } = useStore();
  return (
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
        Thông tin tài khoản:
      </Typography>

      <AccountForm
        id={userStore.user?.id ?? "empty-id"}
        userName={userStore.user?.userName ?? "empty-username"}
        firstName={userStore.user?.firstName ?? "empty-first-name"}
        lastName={userStore.user?.lastName ?? "empty-last-name"}
        email={userStore.user?.email ?? "empty-email"}
      />

      <Alert severity="info" sx={{ mt: 2 }}>
        <AlertTitle>Hệ Thống</AlertTitle>
        Hiện tại chưa thể cập nhật email tại đây! Hãy truy cập{" "}
        <a
          href="https://sinhvien.hutech.edu.vn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Trang Sinh Viên
        </a>{" "}
        hoặc liên hệ Phòng Đào Tạo để cập nhật email! Xin cảm ơn!
      </Alert>
    </Box>
  );
};

export default AccountInfoTab;
