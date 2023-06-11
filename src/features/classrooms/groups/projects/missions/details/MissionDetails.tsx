import { Box, Chip, Divider, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { observer } from "mobx-react-lite";
import { useStore } from "../../../../../../app/stores/store";
import { Mission } from "../../../../../../app/models/Mission";
import MissionLayout from "../layout/MissionLayout";
import AlertDialog from "../../../../../common/UI/AlertDialog";
import CreateEditDialog from "../../../../../common/UI/CreateEditDialog";
import MissionForm from "../list/form/MissionForm";
import MissionDetailsSkeleton from "../../../../../../app/layout/indicators/details/MissionDetailsSkeleton";

const MissionDetails = () => {
  const { missionStore } = useStore();
  const [mission, setMission] = useState<Mission>(new Mission());
  const { missionId, classroomId, groupId, projectId } = useParams<{
    missionId: string;
    classroomId: string;
    groupId: string;
    projectId: string;
  }>();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (missionId)
      missionStore
        .delete(missionId)
        .then(() =>
          navigate(`/cr/${classroomId}/gr/${groupId}/pj/${projectId}/missions`)
        );
  };

  useEffect(() => {
    if (missionId)
      missionStore.get(missionId).then(() => {
        if (missionStore.selectedItem) setMission(missionStore.selectedItem);
      });
  }, [missionId, missionStore]);

  if (missionStore.isDetailsLoading) return <MissionDetailsSkeleton />;

  return (
    <Box>
      <MissionLayout
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
                THÔNG TIN NHIỆM VỤ
              </Typography>

              <Box sx={{ display: "flex" }}>
                <AlertDialog
                  iconButton={<DeleteIcon />}
                  titleButton="XOÁ"
                  alertDialogTitle="Xoá nhiệm vụ?"
                  alertDialogDescription="Bạn có chắc chắn xoá nhiệm vụ này không?"
                  negation="Huỷ"
                  affirmation="Xoá"
                  onSubmit={handleSubmit}
                />
                <CreateEditDialog
                  iconButton={<EditIcon />}
                  titleButton="CHỈNH SỬA"
                  titleDialog="CHỈNH SỬA NHIỆM VỤ"
                  formComponent={(handleClose) => (
                    <MissionForm mission={mission} handleClose={handleClose} />
                  )}
                />
              </Box>
            </Box>

            <Typography variant="body1" gutterBottom>
              Tiêu đề nhiệm vụ: <strong>{mission.title}</strong>
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body1" color="gray" gutterBottom>
                {new Date(`${mission.createDate}Z`).toLocaleString("vi-VN", {
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
                Mô tả nhiệm vụ:
              </Typography>
              {mission.description === "" ? (
                <em>
                  <Typography variant="body2" gutterBottom>
                    - Chưa có -
                  </Typography>
                </em>
              ) : (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{
                    __html: mission.description,
                  }}
                  style={{ padding: "0" }}
                ></Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", mt: 2 }}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="primary"
                gutterBottom
                sx={{ mr: 1 }}
              >
                Trạng thái hoàn thành:
              </Typography>
              {mission.isDone ? (
                <Chip label="Đã hoàn thành" color="success" size="small" />
              ) : (
                <Chip label="Chưa hoàn thành" color="primary" size="small" />
              )}
            </Box>

            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="primary"
                gutterBottom
                sx={{ mr: 1 }}
              >
                Được giao cho thành viên:
              </Typography>
              {mission.missionUsers.map((u, i) => (
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
                to={`/cr/${classroomId}/gr/${groupId}/pj/${projectId}/missions`}
              >
                Quay Về
              </Button>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

export default observer(MissionDetails);
