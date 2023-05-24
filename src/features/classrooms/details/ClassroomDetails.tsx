import { Box, Divider, Typography } from "@mui/material";
import { Major } from "../../../app/models/Major";
import { Subject } from "../../../app/models/Subject";
import { Faculty } from "../../../app/models/Faculty";
import Profile from "../../../app/common/models/Profile";
import { Classroom } from "../../../app/models/Classroom";
import { ClassroomTypes } from "../../../app/layout/enums/ClassroomTypes";
import { ClassroomSemester } from "../../../app/layout/enums/ClassroomSemesters";

const major: Major = {
  id: "m1",
  code: "7480201",
  title: "Công Nghệ Thông Tin",
  totalCredits: 152,
  nonCumulativeCredits: 5,
  createDate: new Date(2022, 11, 1),
};

const subject: Subject = {
  id: "s1",
  code: "CMP1024",
  title: "Lập trình ứng dụng với Java",
  totalCredits: 3,
  createDate: new Date(2022, 11, 1),
  major: major,
};

const faculty: Faculty = {
  id: "s1",
  name: "Khoa Công Nghệ Thông Tin",
  createDate: new Date(2022, 11, 1),
};

const member: Profile = {
  userName: "nguyenvana",
  email: "nguyenvana@gmail.com",
  firstName: "Nguyen Van",
  lastName: "A",
};

const classroom: Classroom = {
  id: "c1",
  title: "CMP1024",
  room: "E1-09.05",
  type: ClassroomTypes.TheoryRoom,
  studyPeriod: "01/01/2023 - 06/06/2023",
  class: "20DTHD3",
  schoolYear: "2022",
  semester: ClassroomSemester.II,
  description: "Lập trình ứng dụng với Java",
  studyGroup: "20",
  practicalStudyGroup: "0",
  createDate: new Date(2022, 11, 1),

  subject: subject,
  faculty: faculty,
  lecturer: member,
};

const ClassroomDetails = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
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
      <Box sx={{ display: "flex", mb: 1 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
            textAlign: "start",
          }}
        >
          Thông tin chi tiết về lớp học:
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ textAlign: "start", m: "20px 0" }}>
        <Typography variant="subtitle1" gutterBottom>
          Mã môn: <strong>{classroom.title}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tên môn: <strong>{classroom.description}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Số tín chỉ học phần:{" "}
          <strong>{classroom.subject?.totalCredits}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Phòng: <strong>{classroom.room}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tên phòng:{" "}
          <strong>
            {classroom.type === "TheoryRoom"
              ? "Phòng Lý Thuyết"
              : "Phòng Thực Hành"}
          </strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Thời gian học: <strong>{classroom.studyPeriod}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Lớp: <strong>{classroom.class}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Năm học: <strong>{classroom.schoolYear}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Học kỳ: <strong>{classroom.semester}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Nhóm học: <strong>{classroom.studyGroup}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Nhóm thực hành:{" "}
          <strong>
            {classroom.practicalStudyGroup === "0"
              ? "Không có"
              : classroom.practicalStudyGroup}
          </strong>
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ textAlign: "start", m: "20px 0" }}>
        <Typography variant="subtitle1" gutterBottom>
          Mã giảng viên: <strong>{classroom.lecturer?.userName}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tên giảng viên:{" "}
          <strong>
            {classroom.lecturer?.firstName} {classroom.lecturer?.lastName}
          </strong>
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ textAlign: "start", m: "20px 0" }}>
        <Typography variant="subtitle1" gutterBottom>
          Khoa: <strong>{classroom.faculty?.name}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Ngành: <strong>{classroom.subject?.major?.title}</strong>
        </Typography>
      </Box>
    </Box>
  );
};

export default ClassroomDetails;
