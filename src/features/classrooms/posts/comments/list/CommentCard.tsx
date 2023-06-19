import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { blue } from "@mui/material/colors";

import PersonIcon from "@mui/icons-material/Person";
import { Comment } from "../../../../../app/models/Comment";
import AlertDialog from "../../../../common/UI/AlertDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStore } from "../../../../../app/stores/store";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = (props: CommentCardProps) => {
  const { commentStore, userStore } = useStore();

  const handleSubmit = () => {
    commentStore.deleteComment(props.comment.id);
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
          <AlertDialog
          hidden={userStore.user?.id ===  props.comment.user?.id ? false : true}
            iconButton={<DeleteIcon />}
            titleButton="XOÁ"
            alertDialogTitle="Xoá nhận xét?"
            alertDialogDescription="Bạn có chắc chắn muốn xoá nhận xét này không?"
            negation="Huỷ"
            affirmation="Xoá"
            onSubmit={handleSubmit}
          />
        }
        title={`${props.comment.user?.lastName} ${props.comment.user?.firstName}`}
        subheader={new Date(`${props.comment.createDate}Z`).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      />
      <CardContent>
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: props.comment.content }}
        ></Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
