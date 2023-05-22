import { Typography, Box, Alert, AlertTitle } from "@mui/material";

const contactInfo = {
  department: "PHÒNG ĐÀO TẠO - KHẢO THÍ",
  address: "475A (số cũ:144/24) Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM",
  phone: "(028) 3 5120782",
  fax: "(028) 3 5120784",
  email: "daotao@hutech.edu.vn",
};

const InformationTab = () => {
  return (
    <Box sx={{ textAlign: "start" }}>
      <Alert severity="info">
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

export default InformationTab;
