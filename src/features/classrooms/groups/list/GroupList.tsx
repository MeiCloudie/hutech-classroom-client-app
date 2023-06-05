import { useState, useEffect } from "react";
import { Box, Grid, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { useStore } from "../../../../app/stores/store";
import { PaginationParams } from "../../../../app/common/models/paginationPrams";
import { observer } from "mobx-react-lite";
import PlaceholderBox from "../../../common/UI/PlaceholderBox";
import { Group } from "../../../../app/models/Group";
import GroupCard from "./GroupCard";
import GroupCardSkeleton from "../../../../app/layout/indicators/cards/GroupCardSkeleton";

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.only("xs")]: {
    "& .MuiGrid-item": {
      width: "100%",
    },
  },
  [theme.breakpoints.only("sm")]: {
    "& .MuiGrid-item": {
      width: "50%",
    },
  },
  [theme.breakpoints.up("md")]: {
    "& .MuiGrid-item": {
      width: "33.33%",
    },
  },
}));

const GroupList = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const { classroomStore, groupStore } = useStore();
  const { classroomId } = useParams<{ classroomId: string }>();

  useEffect(() => {
    if (classroomId)
      classroomStore.get(classroomId).then(() => {
        groupStore
          .loadClassroomGroups(classroomId, new PaginationParams(1, 100))
          .then(() => {
            setGroups(groupStore.items);
          });
      });
  }, [classroomId, classroomStore, groupStore]);

  if (groupStore.isListLoading)
    return (
      <ResponsiveGrid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GroupCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GroupCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GroupCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GroupCardSkeleton />
        </Grid>
      </ResponsiveGrid>
    );

  return (
    <ResponsiveGrid container spacing={2}>
      {groups.length === 0 ? (
        <Box sx={{ width: "100%", ml: 2 }}>
          <PlaceholderBox
            title="Đây là nơi quản lý các nhóm của lớp học"
            subtitle="Bạn có thể tạo nhóm tại đây!"
          />
        </Box>
      ) : (
        groups.map((g, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <GroupCard key={index} group={g} />
          </Grid>
        ))
      )}
    </ResponsiveGrid>
  );
};

export default observer(GroupList);
