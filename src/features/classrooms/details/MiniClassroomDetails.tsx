import { Box, Divider, Typography } from "@mui/material";
import { Classroom } from "../../../app/models/Classroom";
import IconButtonTooltip from "../../common/UI/IconButtonTooltip";

import InfoIcon from "@mui/icons-material/Info";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import MiniClassroomDetailsSkeleton from "../../../app/layout/indicators/details/MiniClassroomDetailsSkeleton";

const MiniClassroomDetails = () => {
  const { classroomStore } = useStore();
  const [classroom, setClassroom] = useState<Classroom>(new Classroom());
  const { classroomId } = useParams<{ classroomId: string }>();

  useEffect(() => {
    if (classroomId) {
      classroomStore.get(classroomId).then(() => {
        setClassroom(classroomStore.selectedItem ?? new Classroom());
      });
    }
  }, [classroomId, classroomStore]);

  if (classroomStore.isDetailsLoading) return <MiniClassroomDetailsSkeleton />;

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
      textAlign={"center"}
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
          link={`/cr/${classroomId}`}
        />
      </Box>

      <Divider />

      {classroom.class !== null && (
        <>
          <Box sx={{ m: "20px 0" }}>
            <Typography variant="h4" gutterBottom>
              {classroom.class}
            </Typography>
          </Box>

          <Divider />
        </>
      )}

      <Box sx={{ m: "20px 0" }}>
        <Typography variant="subtitle1" gutterBottom>
          Nhóm {classroom.studyGroup} - Phòng {classroom.room}
        </Typography>

        {classroom.practicalStudyGroup !== ("0" && null) && (
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
          Giảng viên {classroom.lecturer?.lastName}{" "}
          {classroom.lecturer?.firstName}
        </Typography>
      </Box>
    </Box>
  );
};

export default observer(MiniClassroomDetails);
