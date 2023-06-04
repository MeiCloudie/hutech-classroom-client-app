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

import { Button, Divider } from "@mui/material";
import React from "react";

import { Group } from "../../../../app/models/Group";
import { Link, useParams } from "react-router-dom";
import MenuMini from "../../../common/UI/MenuMini";

interface GroupCardProps {
  group: Group;
}

const GroupCard = (props: GroupCardProps) => {
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
      link: `/cr/${classroomId}/gr/${groupId}`,
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
        title={props.group.name}
        subheader={props.group.createDate.toString()}
      />
      <MenuMini
        id="menu-more"
        anchorEl={anchorElMore}
        handleCloseMenu={handleCloseMoreMenu}
        options={moreOptions}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`Nhóm Trưởng: ${props.group.leader?.firstName} ${props.group.leader?.lastName}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {
            <div
              style={{
                maxWidth: "80%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={`Mô tả: ${props.group.description}`}
            >
              {`Mô tả: ${props.group.description}`}
            </div>
          }
        </Typography>
      </CardContent>
      <Divider />
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          variant="text"
          component={Link}
          to={`/cr/${classroomId}/gr/${props.group.id}`}
        >
          Xem Chi Tiết
        </Button>
        <Button
          variant="contained"
          component={Link}
          to={`/cr/${classroomId}/gr/${props.group.id}/projects-of-group`}
        >
          Dự Án
        </Button>
      </CardActions>
    </Card>
  );
};

export default GroupCard;
