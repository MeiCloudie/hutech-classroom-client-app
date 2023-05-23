import { Typography, Box, Alert, AlertTitle } from "@mui/material";
import { User } from "../../../app/models/User";
import AccountForm from "../forms/AccountForm";

const account: User = {
  id: "a1",
  userName: "2080600803",
  firstName: "Truong Thuc",
  lastName: "Van",
  email: "truongthucvan1242@gmail.com",
};

const AccountInfoTab = () => {
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
        id={account.id}
        userName={account.userName}
        firstName={account.firstName}
        lastName={account.lastName}
        email={account.email}
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
