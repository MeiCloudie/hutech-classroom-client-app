import React from "react";
import { Typography, Box, Alert, AlertTitle } from "@mui/material";
import Member from "../../../app/common/models/Member";

const member: Member = {
  userName: "2080600803",
  email: "truongthucvan1242@gmail.com",
  firstName: "Trương Thục",
  lastName: "Vân",
};

const contactInfo = {
    department: "PHÒNG ĐÀO TẠO - KHẢO THÍ",
    address: "475A (số cũ:144/24) Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM",
    phone: "(028) 3 5120782",
    fax: "(028) 3 5120784",
    email: "daotao@hutech.edu.vn",
  };

const AccountInformationTab = () => {
  return (
    <Box sx = {{ textAlign: "start"}}>
      <Typography variant="h4" gutterBottom>Thông tin tài khoản</Typography>
      <Typography variant="body1">Tài khoản: {member.userName}</Typography>
      <Typography variant="body1">Email: {member.email}</Typography>
      <Typography variant="body1">Họ tên: {member.firstName} {member.lastName}</Typography>

      <Alert severity="info" sx={{ mt: 4 }}>
        <AlertTitle>
          Yêu cầu chỉnh sửa các thông tin khác xin liên hệ:
        </AlertTitle>
        <Typography variant="body1">Phòng ban: {contactInfo.department}</Typography>
        <Typography variant="body1">Trụ sở: {contactInfo.address}</Typography>
        <Typography variant="body1">ĐT: {contactInfo.phone}</Typography>
        <Typography variant="body1">Fax: {contactInfo.fax}</Typography>
        <Typography variant="body1">Email: {contactInfo.email}</Typography>
      </Alert>
    </Box>
  );
};

export default AccountInformationTab;
