import { Box, Typography } from "@mui/material";
import ChangePasswordForm from "../forms/ChangePasswordForm";

const ChangePasswordTab = () => {
  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: "primary.main",
          textAlign: "start",
          mb: 2,
        }}
      >
        Thay đổi mật khẩu:
      </Typography>
      <ChangePasswordForm />
    </Box>
  );
};

export default ChangePasswordTab;
