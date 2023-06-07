import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Mission } from "../../../../../../app/models/Mission";
import { useStore } from "../../../../../../app/stores/store";
import { PaginationParams } from "../../../../../../app/common/models/paginationPrams";
import PlaceholderBox from "../../../../../common/UI/PlaceholderBox";
import MissionCard from "./MissionCard";
import MissionCardSkeleton from "../../../../../../app/layout/indicators/cards/MissionCardSkeleton";

const MissionList = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const { projectStore, missionStore } = useStore();
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    if (projectId)
      projectStore.get(projectId).then(() => {
        missionStore
          .loadProjectMissions(projectId, new PaginationParams(1, 100))
          .then(() => {
            setMissions(missionStore.items);
          });
      });
  }, [projectId, projectStore, missionStore]);

  if (missionStore.isListLoading)
    return (
      <>
        <MissionCardSkeleton />
        <MissionCardSkeleton />
        <MissionCardSkeleton />
      </>
    );

  return (
    <Box>
      {missions.length === 0 ? (
        <PlaceholderBox
          title="Đây là nơi quản lý nhiệm vụ của dự án"
          subtitle="Hiện dự án chưa có nhiệm vụ!"
        />
      ) : (
        missions.map((m, index) => <MissionCard key={index} mission={m} />)
      )}
    </Box>
  );
};

export default observer(MissionList);
