import { Box, Divider, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../../../app/stores/store";
import { Project } from "../../../../../../app/models/Project";
import IconButtonTooltip from "../../../../../common/UI/IconButtonTooltip";

const MiniProjectDetails = () => {
  const { projectStore } = useStore();
  const [project, setProject] = useState<Project>(new Project());
  const { groupId, projectId, classroomId } = useParams<{
    groupId: string;
    projectId: string;
    classroomId: string;
  }>();

  useEffect(() => {
    if (projectId)
      projectStore.get(projectId).then(() => {
        console.log("Project: ", projectStore.selectedItem);
        if (projectStore.selectedItem) setProject(projectStore.selectedItem);
      });
  }, [projectId, projectStore]);

  //   if (projectStore.isDetailsLoading) return <MiniProjectDetailsSkeleton />;

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        p: 2,
        mt: 2,
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
        textAlign: "center",
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
          Thông tin dự án
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

        <IconButtonTooltip
          titleTooltip="Xem chi tiết"
          ariaLabel="exercise"
          icon={<InfoIcon />}
          link={`/cr/${classroomId}/gr/${groupId}/pj/${projectId}`}
        />
      </Box>

      <Divider />

      <Box sx={{ m: "20px 0" }}>
        <Typography variant="h4" gutterBottom>
          {project.name}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ m: "20px 0" }}>
        <Typography
          variant="h6"
          sx={{
            color: (theme) => theme.palette.success.main,
            fontWeight: "bold",
          }}
          gutterBottom
        >
          Nhóm trưởng: {project.group?.leader?.firstName}{" "}
          {project.group?.leader?.lastName}
        </Typography>
      </Box>
    </Box>
  );
};

export default observer(MiniProjectDetails);
