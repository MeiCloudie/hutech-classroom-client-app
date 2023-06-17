import { Box, Button, Divider, Typography } from "@mui/material";
import ProjectLayout from "../layout/ProjectLayout";
import CreateEditDialog from "../../../../common/UI/CreateEditDialog";
import AddIcon from "@mui/icons-material/Add";
import ProjectList from "./ProjectList";
import ProjectForm from "./form/ProjectForm";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useStore } from "../../../../../app/stores/store";
import { useEffect, useState } from "react";

import { PaginationParams } from "../../../../../app/common/models/paginationPrams";
import { Group } from "../../../../../app/models/Group";

const ProjectPage = () => {
  const { groupId, classroomId } = useParams<{
    classroomId: string;
    groupId: string;
  }>();
  const { groupStore, userStore } = useStore();
  const [group, setGroup] = useState<Group>(new Group());

  useEffect(() => {
    if (groupId)
      groupStore.get(groupId).then(() => {
        groupStore.loadGroupUsers(new PaginationParams(1, 100, "")).then(() => {
          if (groupStore.selectedItem) setGroup(groupStore.selectedItem);
        });
      });
  }, [groupId, groupStore]);

  return (
    <Box>
      <ProjectLayout
        component={
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
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: (theme) => theme.palette.primary.main,
                  textAlign: "start",
                }}
                mt={1}
              >
                DỰ ÁN
              </Typography>

              <CreateEditDialog
                disabled={
                  userStore.isLecturer ||
                  userStore.user?.id === group.leader?.id
                    ? false
                    : true
                }
                iconButton={<AddIcon />}
                titleButton="TẠO DỰ ÁN"
                titleDialog="TẠO DỰ ÁN"
                formComponent={(handleClose) => (
                  <ProjectForm handleClose={handleClose} />
                )}
              />
            </Box>

            <Divider />

            <ProjectList />

            <Divider />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                sx={{ mt: 2, mb: 2 }}
                component={Link}
                to={`/cr/${classroomId}/gr/${groupId}`}
              >
                Quay về nhóm
              </Button>
              <Button
                variant="outlined"
                sx={{ mt: 2, mb: 2 }}
                component={Link}
                to={`/cr/${classroomId}/groups`}
              >
                Danh sách nhóm
              </Button>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

export default ProjectPage;
