import { Box, Button, Divider, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MissionLayout from "../layout/MissionLayout";
import CreateEditDialog from "../../../../../common/UI/CreateEditDialog";
import MissionForm from "./form/MissionForm";
import MissionList from "./MissionList";
import { useStore } from "../../../../../../app/stores/store";
import { useEffect, useState } from "react";
import { Group } from "../../../../../../app/models/Group";
import { PaginationParams } from "../../../../../../app/common/models/paginationPrams";

const MissionPage = () => {
  const { groupId, classroomId, projectId } = useParams<{
    groupId: string;
    classroomId: string;
    projectId: string;
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
      <MissionLayout
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
                NHIỆM VỤ
              </Typography>

              <CreateEditDialog
                disabled={
                  userStore.isLecturer ||
                  userStore.user?.id === group.leader?.id
                    ? false
                    : true
                }
                iconButton={<AddIcon />}
                titleButton="TẠO NHIỆM VỤ"
                titleDialog="TẠO NHIỆM VỤ"
                formComponent={(handleClose) => (
                  <MissionForm handleClose={handleClose} />
                )}
              />
            </Box>

            <Divider />

            <MissionList />

            <Divider />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                sx={{ mt: 2, mb: 2 }}
                component={Link}
                to={`/cr/${classroomId}/gr/${groupId}/pj/${projectId}`}
              >
                Quay về dự án
              </Button>
              <Button
                variant="outlined"
                sx={{ mt: 2, mb: 2 }}
                component={Link}
                to={`/cr/${classroomId}/gr/${groupId}/projects`}
              >
                Danh sách dự án
              </Button>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

export default MissionPage;
