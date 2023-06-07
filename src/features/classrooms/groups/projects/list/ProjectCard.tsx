import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { blue } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Button, Divider } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Project } from "../../../../../app/models/Project";
import MenuMini from "../../../../common/UI/MenuMini";

import TaskIcon from '@mui/icons-material/Task';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { classroomId, groupId } = useParams<{
    classroomId: string;
    groupId: string;
  }>();
  const [anchorElMore, setAnchorElMore] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenMoreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMore(event.currentTarget);
  };

  const handleCloseMoreMenu = () => {
    setAnchorElMore(null);
  };

  const moreOptions = [
    {
      text: "Xem chi tiết",
      link: `/cr/${classroomId}/gr/${groupId}/pj/${props.project.id}`,
    },
    {
      text: "Hỗ trợ",
      link: "/helps",
    },
  ];

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        textAlign: "start",
        borderWidth: 2,
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
        position: "relative",
        m: "10px 0",
      }}
      variant="outlined"
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[800] }} aria-label="auto-stories-icon">
            <AutoStoriesIcon />
          </Avatar>
        }
        action={
          <IconButton
            aria-label="more"
            sx={{
              transition: "color 0.2s",
              "&:hover": {
                color: blue[800],
              },
              position: "absolute",
              top: 8,
              right: 8,
            }}
            onClick={handleOpenMoreMenu}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={`${props.project.name} - Nhóm trưởng: ${props.project.group?.leader?.firstName} ${props.project.group?.leader?.lastName}`}
        subheader={new Date(`${props.project.createDate}Z`).toLocaleString(
          "vi-VN",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }
        )}
      />
      <MenuMini
        id="menu-more"
        anchorEl={anchorElMore}
        handleCloseMenu={handleCloseMoreMenu}
        options={moreOptions}
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="primary"
          gutterBottom
        >
          Mô tả dự án:
        </Typography>
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: props.project.description }}
          style={{ padding: "0" }}
        ></Typography>
      </CardContent>
      <Divider />
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          variant="text"
          component={Link}
          to={`/cr/${classroomId}/gr/${groupId}/pj/${props.project.id}`}
        >
          Xem Chi Tiết
        </Button>
        <Button
          variant="contained"
          component={Link}
          to={`/cr/${classroomId}/gr/${groupId}/pj/${props.project.id}/missions`}
          startIcon={<TaskIcon />}
        >
          Nhiệm vụ
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
