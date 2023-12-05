import { Box, Typography } from "@mui/material";
import ChangeEmailForm from "../forms/ChangeEmailForm";

const ChangeEmailTab = () => {
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
        Thay đổi email:
      </Typography>
      <ChangeEmailForm />
    </Box>
  );
};

export default ChangeEmailTab;
