import React from "react";
import { Typography, Box, Alert, AlertTitle } from "@mui/material";
import { User } from "../../../app/models/User";

const account: User = {
  id: "a1",
  userName: "2080600803",
  firstName: "Truong Thuc",
  lastName: "Van",
  email: "truongthucvan1242@gmail.com",
};

const contactInfo = {
  department: "PHÒNG ĐÀO TẠO - KHẢO THÍ",
  address: "475A (số cũ:144/24) Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM",
  phone: "(028) 3 5120782",
  fax: "(028) 3 5120784",
  email: "daotao@hutech.edu.vn",
};

const AccountInfoTab = () => {
  return (
    <Box sx={{ textAlign: "start" }}>
      <Typography variant="h4">
        Thông tin tài khoản
      </Typography>
      <Typography variant="body1">Tài khoản: {account.userName}</Typography>
      <Typography variant="body1">Email: {account.email}</Typography>
      <Typography variant="body1">
        Họ tên: {account.firstName} {account.lastName}
      </Typography>

      <Alert severity="info" sx={{ mt: 4 }}>
        <AlertTitle>
          Yêu cầu chỉnh sửa các thông tin khác xin liên hệ:
        </AlertTitle>
        <Typography variant="body1">
          Phòng ban: {contactInfo.department}
        </Typography>
        <Typography variant="body1">Trụ sở: {contactInfo.address}</Typography>
        <Typography variant="body1">ĐT: {contactInfo.phone}</Typography>
        <Typography variant="body1">Fax: {contactInfo.fax}</Typography>
        <Typography variant="body1">Email: {contactInfo.email}</Typography>
      </Alert>
    </Box>
  );
};

export default AccountInfoTab;
