import { Box, Divider, Typography } from "@mui/material";
import { Major } from "../../../app/models/Major";
import { Subject } from "../../../app/models/Subject";
import { Faculty } from "../../../app/models/Faculty";
import Profile from "../../../app/common/models/Profile";
import { Classroom } from "../../../app/models/Classroom";
import { ClassroomTypes } from "../../../app/layout/enums/ClassroomTypes";
import { ClassroomSemester } from "../../../app/layout/enums/ClassroomSemesters";
import IconButtonTooltip from "../../common/UI/IconButtonTooltip";

import InfoIcon from "@mui/icons-material/Info";

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
  id: "1",
  userName: "nguyenvana",
  email: "nguyenvana@gmail.com",
  firstName: "Nguyen Van",
  lastName: "A",
  createDate: new Date()
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

  classroomUsers: []
};

const MiniClassroomDetails = () => {
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
      <Box sx={{ display: "flex", pb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          Thông tin lớp học
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <IconButtonTooltip
            titleTooltip="Xem chi tiết"
            ariaLabel="exercise"
            icon={<InfoIcon />}
            link="/cr/:id"
          />
      </Box>

      <Divider />

      <Box sx={{ m: "20px 0" }}>
        <Typography variant="h4" gutterBottom>
          {classroom.class}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ m: "20px 0" }}>
        <Typography variant="subtitle1" gutterBottom>
          Nhóm {classroom.studyGroup} - Phòng {classroom.room}
        </Typography>

        {classroom.practicalStudyGroup !== "0" && (
          <Typography variant="subtitle1" gutterBottom>
            Nhóm thực hành: {classroom.practicalStudyGroup}
          </Typography>
        )}
      </Box>

      <Divider />

      <Box sx={{ m: "20px 0" }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold" }}
          gutterBottom
        >
          Môn học: {classroom.subject?.title}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold" }}
          gutterBottom
        >
          Học kỳ: {classroom.semester} - Năm học: {classroom.schoolYear}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: (theme) => theme.palette.success.main,
            fontWeight: "bold",
          }}
          gutterBottom
        >
          Giảng viên {classroom.lecturer?.firstName}{" "}
          {classroom.lecturer?.lastName}
        </Typography>
      </Box>
    </Box>
  );
};

export default MiniClassroomDetails;
