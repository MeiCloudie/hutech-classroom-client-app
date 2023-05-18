import { Box, Divider, Typography } from "@mui/material";
import CurrentDate from "../common/CurrentDate";
import React from "react";

const NotificationContent = () => {
  return (
    <React.Fragment>
      <Box sx={{ pt: "30px" }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          THÔNG BÁO
        </Typography>
        <Divider />
      </Box>

      <Box sx={{ p: "10px 0" }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Hệ Thống
        </Typography>

        <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle1" gutterBottom>
            Dữ liệu được cập nhật vào lúc:&nbsp;
          </Typography>
          <CurrentDate />
        </Box>

        <Typography variant="subtitle1" gutterBottom sx={{ display: "flex" }}>
          Đang truy cập: {Math.floor(Math.random() * (10 - 1)) + 1}
        </Typography>
      </Box>

      <Divider /> 	

      <Box sx={{ p: "10px 0" }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Việc Cần Làm
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ display: "flex" }}>
          Không có
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default NotificationContent;
