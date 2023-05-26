import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { blue } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Divider } from "@mui/material";
import { Classroom } from "../../../app/models/Classroom";
import React from "react";
import MenuMini from "../../common/UI/MenuMini";
import IconButtonTooltip from "../../common/UI/IconButtonTooltip";
import { ClassroomTypes } from "../../../app/layout/enums/ClassroomTypes";

interface ClassroomCardProps {
  classroom: Classroom;
}

const moreOptions = [
  {
    text: "Xem chi tiết",
    link: "/cr/:id",
  },
  {
    text: "Xem bài tập",
    link: "/cr/:id/exercises",
  },
  {
    text: "Hỗ trợ",
    link: "/helps",
  },
];

const ClassroomCard = (props: ClassroomCardProps) => {
  const [anchorElMore, setAnchorElMore] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenMoreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMore(event.currentTarget);
  };

  const handleCloseMoreMenu = () => {
    setAnchorElMore(null);
  };
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
          <Avatar sx={{ bgcolor: blue[800] }} aria-label="classroom-icon">
            <SchoolIcon />
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
        title={props.classroom.title}
        subheader={
          <div
            style={{
              maxWidth: "80%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={props.classroom.description}
          >
            {props.classroom.description}
          </div>
        }
      />
      <MenuMini
        id="menu-more"
        anchorEl={anchorElMore}
        handleCloseMenu={handleCloseMoreMenu}
        options={moreOptions}
      />
      <CardMedia
        component="img"
        height="194"
        image={
          props.classroom.type === ClassroomTypes.TheoryRoom
            ? "banner1.png"
            : props.classroom.type === ClassroomTypes.PracticeRoom
            ? "banner2.png"
            : "banner3.png"
        }
        alt="banner-classroom"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`Giang vien: ${props.classroom.lecturer?.firstName} ${props.classroom.lecturer?.lastName}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Phong: ${props.classroom.room}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Lop: ${props.classroom.class}`}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <IconButtonTooltip
            titleTooltip={`Mở bài tập của bạn tại lớp "${props.classroom.description}"`}
            ariaLabel="exercise"
            icon={<AssignmentIcon />}
            link={`/cr/${props.classroom.id}/exercises`}
          />
          <IconButtonTooltip
            titleTooltip={`Xem thành viên tại lớp "${props.classroom.description}"`}
            ariaLabel="everybody"
            icon={<GroupsIcon />}
            link={`/cr/${props.classroom.id}/everybody`}
          />
        </div>
        <IconButtonTooltip
            titleTooltip={`Đến lớp "${props.classroom.description}"`}
            ariaLabel="go-details"
            icon={<ArrowCircleRightIcon />}
            link={`/cr/${props.classroom.id}`}
          />
      </CardActions>
    </Card>
  );
};

export default ClassroomCard;
