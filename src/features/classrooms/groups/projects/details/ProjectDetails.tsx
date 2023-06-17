import { Box, Divider, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import { observer } from "mobx-react-lite";
import { Project } from "../../../../../app/models/Project";
import ProjectForm from "../list/form/ProjectForm";
import { useStore } from "../../../../../app/stores/store";
import AlertDialog from "../../../../common/UI/AlertDialog";
import CreateEditDialog from "../../../../common/UI/CreateEditDialog";
import ProjectLayout from "../layout/ProjectLayout";
import ProjectDetailsSkeleton from "../../../../../app/layout/indicators/details/ProjectDetailsSkeleton";

const ProjectDetails = () => {
  const { projectStore, userStore } = useStore();
  const [project, setProject] = useState<Project>(new Project());
  const { projectId, classroomId, groupId } = useParams<{
    projectId: string;
    classroomId: string;
    groupId: string;
  }>();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (projectId)
      projectStore
        .delete(projectId)
        .then(() => navigate(`/cr/${classroomId}/gr/${groupId}/projects`));
  };

  useEffect(() => {
    if (projectId)
      projectStore.get(projectId).then(() => {
        if (projectStore.selectedItem) setProject(projectStore.selectedItem);
      });
  }, [projectId, projectStore]);

  if (projectStore.isDetailsLoading) return <ProjectDetailsSkeleton />;

  return (
    <Box>
      <ProjectLayout
        component={
          <Box
            sx={{
              bgcolor: "#f5f5f5",
              p: 2,
              mb: 2,
              border: "1px solid #e8e8e8",
              borderRadius: "5px",
              transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
              "&:hover": {
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                transform: "translateY(-4px)",
              },
              textAlign: "start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: (theme) => theme.palette.primary.main,
                  textAlign: "start",
                }}
              >
                THÔNG TIN DỰ ÁN
              </Typography>

              <Box sx={{ display: "flex" }}>
                <AlertDialog
                  disabled={
                    userStore.isLecturer ||
                    userStore.user?.id === project.group?.leader?.id
                      ? false
                      : true
                  }
                  iconButton={<DeleteIcon />}
                  titleButton="XOÁ"
                  alertDialogTitle="Xoá dự án?"
                  alertDialogDescription="Nhiệm vụ cũng sẽ bị xoá"
                  negation="Huỷ"
                  affirmation="Xoá"
                  onSubmit={handleSubmit}
                />
                <CreateEditDialog
                  disabled={
                    userStore.isLecturer ||
                    userStore.user?.id === project.group?.leader?.id
                      ? false
                      : true
                  }
                  iconButton={<EditIcon />}
                  titleButton="CHỈNH SỬA"
                  titleDialog="CHỈNH SỬA DỰ ÁN"
                  formComponent={(handleClose) => (
                    <ProjectForm project={project} handleClose={handleClose} />
                  )}
                />
              </Box>
            </Box>

            <Typography variant="body1" gutterBottom>
              Tên dự án: <strong>{project.name}</strong>
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body1" gutterBottom>
                Nhóm trưởng:{" "}
                <strong>
                  {project.group?.leader?.lastName}{" "}
                  {project.group?.leader?.firstName}
                </strong>
              </Typography>

              <Typography variant="body1" color="gray" gutterBottom>
                {new Date(`${project.createDate}Z`).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </Typography>
            </Box>

            <Divider color="#1976d2" />

            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="primary"
                gutterBottom
              >
                Mô tả dự án:
              </Typography>
              {project.description === "" ? (
                <em>
                  <Typography variant="body2" gutterBottom>
                    - Chưa có -
                  </Typography>
                </em>
              ) : (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html: project.description,
                  }}
                  style={{ padding: "0" }}
                ></Typography>
              )}
            </Box>

            <Divider />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                sx={{ mt: 2, mb: 2 }}
                component={Link}
                to={`/cr/${classroomId}/gr/${groupId}/projects`}
              >
                Quay Về
              </Button>

              <Button
                variant="contained"
                startIcon={<AutoStoriesIcon />}
                sx={{ mt: 2, mb: 2 }}
                component={Link}
                to={`/cr/${classroomId}/gr/${groupId}/pj/${projectId}/missions`}
              >
                Nhiệm Vụ
              </Button>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

export default observer(ProjectDetails);
