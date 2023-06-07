import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Project } from "../../../../../app/models/Project";
import { useStore } from "../../../../../app/stores/store";
import { PaginationParams } from "../../../../../app/common/models/paginationPrams";
import PlaceholderBox from "../../../../common/UI/PlaceholderBox";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "../../../../../app/layout/indicators/cards/ProjectCardSkeleton";

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { groupStore, projectStore } = useStore();
  const { groupId } = useParams<{ groupId: string }>();

  useEffect(() => {
    if (groupId)
      groupStore.get(groupId).then(() => {
        projectStore
          .loadGroupProjects(groupId, new PaginationParams(1, 100))
          .then(() => {
            setProjects(projectStore.items);
          });
      });
  }, [groupId, groupStore, projectStore]);

    if (projectStore.isListLoading)
      return (
        <>
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </>
      );

  return (
    <Box>
      {projects.length === 0 ? (
        <PlaceholderBox
          title="Đây là nơi quản lý dự án của nhóm"
          subtitle="Hiện nhóm chưa có dự án!"
        />
      ) : (
        projects.map((p, index) => <ProjectCard key={index} project={p} />)
      )}
    </Box>
  );
};

export default observer(ProjectList);
