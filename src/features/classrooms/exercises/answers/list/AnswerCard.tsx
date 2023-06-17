import React from "react";
import { Answer } from "../../../../../app/models/Answer";
import { Link, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import MenuMini from "../../../../common/UI/MenuMini";
import { useStore } from "../../../../../app/stores/store";

interface AnswerCardProps {
  answer: Answer;
}

const AnswerCard = (props: AnswerCardProps) => {
  const { userStore } = useStore();
  const { classroomId, exerciseId } = useParams<{
    classroomId: string;
    exerciseId: string;
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
      link: `/cr/${classroomId}/ex/${exerciseId}/answers/${props.answer.id}`,
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
      }}
      variant="outlined"
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[800] }} aria-label="person-icon">
            <PersonIcon />
          </Avatar>
        }
        action={
          userStore.isLecturer ||
          userStore.user?.id === props.answer.user?.id ? (
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
          ) : null
        }
        title={`${props.answer.user?.lastName} ${props.answer.user?.firstName}`}
        subheader={new Date(`${props.answer.createDate}Z`).toLocaleString(
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
      <Divider />
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="body1"
            color="red"
            fontWeight="bold"
            sx={{ mr: 1 }}
            gutterBottom
          >
            <strong>Điểm:</strong>
          </Typography>
          {props.answer.score < 0 ? (
            <Chip label="Chưa chấm" color="primary" size="small" />
          ) : (
            <Chip
              label={`${props.answer.score}/${props.answer.exercise?.totalScore}`}
              color="success"
              size="small"
            />
          )}
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            maxWidth: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={`Link: ${props.answer.link}`}
        >
          {`Link: ${props.answer.link}`}
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
          to={`/cr/${classroomId}/ex/${exerciseId}/answers/${props.answer.id}`}
          hidden={
            userStore.isLecturer || userStore.user?.id === props.answer.user?.id
              ? false
              : true
          }
        >
          XEM CHI TIẾT
        </Button>
      </CardActions>
    </Card>
  );
};

export default AnswerCard;
