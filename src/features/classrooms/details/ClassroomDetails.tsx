import { Box, Divider, Typography } from "@mui/material";
import { Classroom } from "../../../app/models/Classroom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ClassroomDetailsSkeleton from "../../../app/layout/indicators/details/ClassroomDetailsSkeleton";

const ClassroomDetails = () => {
  const { classroomStore } = useStore()
  const [ classroom, setClassroom ] = useState<Classroom>(new Classroom())
  const { classroomId } = useParams<{classroomId: string}>()
  
  useEffect(() => {
    if (classroomId) {
      classroomStore.get(classroomId).then(() => { 
        setClassroom(classroomStore.selectedItem ?? new Classroom())
      })
    }

  }, [classroomId, classroomStore])

  if (classroomStore.isDetailsLoading) return <ClassroomDetailsSkeleton />

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
          Mã môn: <strong>{classroom.subject?.code}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tên môn: <strong>{classroom.subject?.title}</strong>
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

export default observer(ClassroomDetails);
