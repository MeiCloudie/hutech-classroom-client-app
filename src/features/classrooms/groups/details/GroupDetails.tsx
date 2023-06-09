import MiniDetailsLayout from "../../layout/MiniDetailsLayout";
import { Box, Divider, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { useStore } from "../../../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import CreateEditDialog from "../../../common/UI/CreateEditDialog";
import AlertDialog from "../../../common/UI/AlertDialog";
import { observer } from "mobx-react-lite";
import { Group } from "../../../../app/models/Group";
import GroupForm from "../list/form/GroupForm";
import GroupDetailsSkeleton from "../../../../app/layout/indicators/details/GroupDetailsSkeleton";
import { PaginationParams } from "../../../../app/common/models/paginationPrams";

const GroupDetails = () => {
  const { groupStore } = useStore();
  const [group, setGroup] = useState<Group>(new Group());
  const { groupId, classroomId } = useParams<{
    classroomId: string;
    groupId: string;
  }>();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (groupId)
      groupStore
        .delete(groupId)
        .then(() => navigate(`/cr/${classroomId}/groups`));
  };

  useEffect(() => {
    if (groupId)
      groupStore.get(groupId).then(() => {
        groupStore.loadGroupUsers(new PaginationParams(1, 100, "")).then(() => {
          if (groupStore.selectedItem) setGroup(groupStore.selectedItem);
        });
      });
  }, [groupId, groupStore]);

  if (groupStore.isDetailsLoading) return <GroupDetailsSkeleton />;

  return (
    <Box>
      <MiniDetailsLayout
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
                THÔNG TIN NHÓM
              </Typography>

              <Box sx={{ display: "flex" }}>
                <AlertDialog
                  iconButton={<DeleteIcon />}
                  titleButton="XOÁ"
                  alertDialogTitle="Xoá nhóm?"
                  alertDialogDescription="Dự án và nhiệm vụ cũng sẽ bị xoá"
                  negation="Huỷ"
                  affirmation="Xoá"
                  onSubmit={handleSubmit}
                />
                <CreateEditDialog
                  iconButton={<EditIcon />}
                  titleButton="CHỈNH SỬA"
                  titleDialog="CHỈNH SỬA NHÓM"
                  formComponent={(handleClose) => (
                    <GroupForm group={group} handleClose={handleClose} />
                  )}
                />
              </Box>
            </Box>

            <Typography variant="body1" gutterBottom>
              Tên nhóm: <strong>{group.name}</strong>
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body1" gutterBottom>
                Nhóm trưởng:{" "}
                <strong>
                  {group.leader?.firstName} {group.leader?.lastName}
                </strong>
              </Typography>

              <Typography variant="body1" color="gray" gutterBottom>
                {new Date(`${group.createDate}Z`).toLocaleString("vi-VN", {
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
                Mô tả nhóm:
              </Typography>
              {group.description === "" ? (
                <em>
                  <Typography variant="body2" gutterBottom>
                    - Chưa có -
                  </Typography>
                </em>
              ) : (
                <Typography variant="body2" gutterBottom>
                  {group.description}
                </Typography>
              )}
            </Box>

            <Divider />

            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="primary"
                gutterBottom
              >
                Thành viên nhóm:
              </Typography>
              {group.groupUsers.map((u, i) => (
                <Typography key={i}>
                  {i + 1}/{" "}
                  <strong>
                    {u.lastName} {u.firstName}
                  </strong>{" "}
                  - {u.userName}
                </Typography>
              ))}
            </Box>

            <Divider />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                sx={{ mt: 2, mb: 2 }}
                component={Link}
                to={`/cr/${classroomId}/groups`}
              >
                Quay Về
              </Button>

              <Button
                variant="contained"
                startIcon={<AutoStoriesIcon />}
                sx={{ mt: 2, mb: 2 }}
                component={Link}
                to={`/cr/${classroomId}/gr/${groupId}/projects`}
              >
                Dự Án
              </Button>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

export default observer(GroupDetails);
