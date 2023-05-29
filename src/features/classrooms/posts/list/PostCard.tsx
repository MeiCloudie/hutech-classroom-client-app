import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { blue } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import { Button, Divider } from "@mui/material";
import React from "react";
import { Post } from "../../../../app/models/Post";
import MenuMini from "../../../common/UI/MenuMini";
import { Link, useParams } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

interface PostCardProps {
  post: Post;
}

const moreOptions = [
  {
    text: "Xem chi tiết",
    link: "/cr/:classroomId/po/:postId",
  },
  {
    text: "Hỗ trợ",
    link: "/helps",
  },
];

const PostCard = (props: PostCardProps) => {
  const { classroomId } = useParams<{ classroomId: string }>();
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
          <Avatar sx={{ bgcolor: blue[800] }} aria-label="person-icon">
            <PersonIcon />
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
        title={`${props.post.user?.firstName} ${props.post.user?.lastName}`}
        subheader={props.post.createDate.toString()}
      />
      <MenuMini
        id="menu-more"
        anchorEl={anchorElMore}
        handleCloseMenu={handleCloseMoreMenu}
        options={moreOptions}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: props.post.content }}
          style={{ padding: "0" }}
        ></Typography>
        {props.post.link.startsWith("https://") ||
        props.post.link.startsWith("http://") ? (
          <MuiLink href={props.post.link}>
            <Typography variant="body2" color="text.secondary">
              {props.post.link}
            </Typography>
          </MuiLink>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {props.post.link}
          </Typography>
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
          to={`/cr/${classroomId}/po/${props.post.id}`}
        >
          Xem Chi Tiết
        </Button>
        <Button
          variant="contained"
          component={Link}
          to={`/cr/${classroomId}/po/${props.post.id}`}
        >
          Nhận Xét
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
