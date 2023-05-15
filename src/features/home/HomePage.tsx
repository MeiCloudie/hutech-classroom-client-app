import { Box, Button, Divider, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const HomePage = () => {
  return (
    <Box sx={{ textAlign: "left" }}>
      <Box sx={{ pb: "30px" }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          GIỚI THIỆU HỆ THỐNG
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          HUTECH CLASSROOM là một hệ thống quản lý lớp học trực tuyến được phát
          triển bởi Sinh Viên Khoa Công nghệ thông tin - Trường Đại học Công
          nghệ TPHCM HUTECH. Giảng Viên và Sinh Viên có thể tham gia vào các lớp
          học đã được xếp sẵn để tổ chức học tập, quản lý bài tập, quản lý các
          dự án làm việc nhóm tại lớp đó. Với các chức năng do HUTECH CLASSROOM
          hỗ trợ sẽ giúp việc tổ chức lớp học trở nên đơn giản và tiết kiệm thời
          gian.
        </Typography>
        <Button variant="contained" startIcon={<SchoolIcon />}>
          Classrooms
        </Button>
      </Box>

      <Divider />

      <Box sx={{ p: "10px 0" }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          THÔNG BÁO
        </Typography>
        <Divider />
      </Box>

      <Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Title
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Content
        </Typography>
      </Box>

      <Divider />
    </Box>
  );
};

export default HomePage;
