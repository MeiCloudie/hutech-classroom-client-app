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
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { Post } from "../../../../app/models/Post";
import MenuMini from "../../../common/UI/MenuMini";
import { Link, useParams } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

interface PostCardProps {
  post: Post;
}

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

  const moreOptions = [
    {
      text: "Xem chi tiết",
      link: `/cr/${classroomId}/po/${props.post.id}`,
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
        title={`${props.post.user?.lastName} ${props.post.user?.firstName}`}
        subheader={new Date(`${props.post.createDate}Z`).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
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
          dangerouslySetInnerHTML={{ __html: props.post.content }}
          style={{ padding: "0" }}
        ></Typography>

        {props.post.link && props.post.link.trim() !== "" && (
          <Box sx={{ mt: 1, mb: 1 }}>
            <Box sx={{ display: "flex" }}>
              <InsertLinkIcon />
              <Typography
                variant="body1"
                fontWeight={700}
              >
                &nbsp;Link:
              </Typography>
            </Box>

            <Box>
              <ol>
                {props.post.link
                  .trim()
                  .split(/\s+/)
                  .map((link, index) => (
                    <li key={index}>
                      <Box>
                        {link.startsWith("https://") ||
                        link.startsWith("http://") ? (
                          <MuiLink
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ fontWeight: "bold" }}
                          >
                            <em>
                              <Typography
                                variant="body2"
                                fontWeight={700}
                                sx={{ m: 1 }}
                              >
                                {link}
                              </Typography>
                            </em>
                          </MuiLink>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            {link}
                          </Typography>
                        )}
                      </Box>
                    </li>
                  ))}
              </ol>
            </Box>
          </Box>
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
