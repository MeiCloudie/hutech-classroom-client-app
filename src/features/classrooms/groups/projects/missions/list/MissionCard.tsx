import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { blue } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskIcon from "@mui/icons-material/Task";
import { Button, Chip, Divider } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";

import { Mission } from "../../../../../../app/models/Mission";
import MenuMini from "../../../../../common/UI/MenuMini";

interface MissionCardProps {
  mission: Mission;
}

const MissionCard = (props: MissionCardProps) => {
  const { classroomId, groupId, projectId } = useParams<{
    classroomId: string;
    groupId: string;
    projectId: string;
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
      link: `/cr/${classroomId}/gr/${groupId}/pj/${projectId}/ms/${props.mission.id}`,
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
          <Avatar sx={{ bgcolor: blue[800] }} aria-label="task-icon">
            <TaskIcon />
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
        title={`${props.mission.title} - Dự án: ${props.mission.project?.name}`}
        subheader={new Date(`${props.mission.createDate}Z`).toLocaleString(
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
          Mô tả nhiệm vụ:
        </Typography>
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: props.mission.description }}
          style={{ padding: "0" }}
        ></Typography>

        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="primary"
          gutterBottom
        >
          Trạng thái hoàn thành:
        </Typography>
        {props.mission.isDone ? (
          <Chip label="Đã hoàn thành" color="success" />
        ) : (
          <Chip label="Chưa hoàn thành" color="primary" />
        )}
      </CardContent>
      <Divider />
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          variant="text"
          component={Link}
          to={`/cr/${classroomId}/gr/${groupId}/pj/${projectId}/ms/${props.mission.id}`}
        >
          Xem Chi Tiết
        </Button>
      </CardActions>
    </Card>
  );
};

export default MissionCard;
