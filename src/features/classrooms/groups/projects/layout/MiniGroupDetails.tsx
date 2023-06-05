import { Box, Divider, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Group } from "../../../../../app/models/Group";
import IconButtonTooltip from "../../../../common/UI/IconButtonTooltip";
import { useStore } from "../../../../../app/stores/store";
import MiniGroupDetailsSkeleton from "../../../../../app/layout/indicators/details/MiniGroupDetailsSkeleton";

const MiniGroupDetails = () => {
  const { groupStore } = useStore();
  const [group, setGroup] = useState<Group>(new Group());
  const { groupId, classroomId } = useParams<{
    classroomId: string;
    groupId: string;
  }>();

  useEffect(() => {
    if (groupId)
      groupStore.get(groupId).then(() => {
        console.log("Group: ", groupStore.selectedItem);
        if (groupStore.selectedItem) setGroup(groupStore.selectedItem);
      });
  }, [groupId, groupStore]);

  if (groupStore.isDetailsLoading) return <MiniGroupDetailsSkeleton />;

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
          Thông tin nhóm
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

        <IconButtonTooltip
          titleTooltip="Xem chi tiết"
          ariaLabel="exercise"
          icon={<InfoIcon />}
          link={`/cr/${classroomId}/gr/${groupId}`}
        />
      </Box>

      <Divider />

      <Box sx={{ m: "20px 0" }}>
        <Typography variant="h4" gutterBottom>
          {group.name}
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
          Nhóm trưởng: {group.leader?.firstName} {group.leader?.lastName}
        </Typography>
      </Box>
    </Box>
  );
};

export default observer(MiniGroupDetails);
