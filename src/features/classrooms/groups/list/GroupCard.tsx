import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { blue } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import { Button, Divider } from "@mui/material";
import React from "react";

import { Group } from "../../../../app/models/Group";
import { Link, useParams } from "react-router-dom";
import MenuMini from "../../../common/UI/MenuMini";
import { useStore } from "../../../../app/stores/store";

interface GroupCardProps {
  group: Group;
}

const GroupCard = (props: GroupCardProps) => {
  const { userStore, groupStore } = useStore();
  const { classroomId } = useParams<{
    classroomId: string;
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
      link: `/cr/${classroomId}/gr/${props.group.id}`,
    },
    {
      text: "Hỗ trợ",
      link: "/helps",
    },
  ];

  return (
    <Card
      sx={{
        maxWidth: 420,
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
      }}
      variant="outlined"
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[800] }} aria-label="diversity-icon">
            <Diversity3Icon />
          </Avatar>
        }
        action={
          (userStore.isLecturer || groupStore.isInGroup(props.group)) && (
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
          )
        }
        title={props.group.name}
        subheader={new Date(`${props.group.createDate}Z`).toLocaleString(
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
      <Link
        to={
          userStore.isLecturer || groupStore.isInGroup(props.group)
            ? `/cr/${classroomId}/gr/${props.group.id}`
            : ""
        }
        style={{ textDecoration: "none", color: "black" }}
      >
        <CardContent>
          <Typography variant="body2">
            {`Nhóm Trưởng: ${props.group.leader?.lastName} ${props.group.leader?.firstName}`}
          </Typography>
          <Typography
            variant="body2"
            style={{
              maxWidth: "80%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={`Mô tả nhóm: ${props.group.description}`}
          >
            {`Mô tả nhóm: ${props.group.description}`}
          </Typography>
        </CardContent>
      </Link>
      <Divider />
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          variant="text"
          component={Link}
          to={`/cr/${classroomId}/gr/${props.group.id}`}
          disabled={
            userStore.isLecturer || groupStore.isInGroup(props.group)
              ? false
              : true
          }
        >
          Xem Chi Tiết
        </Button>
        <Button
          variant="contained"
          startIcon={<AutoStoriesIcon />}
          component={Link}
          to={`/cr/${classroomId}/gr/${props.group.id}/projects`}
        >
          Dự Án
        </Button>
      </CardActions>
    </Card>
  );
};

export default GroupCard;
