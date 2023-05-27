import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import MemberList from "./MemberList";

const ClassroomEverybody = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        p: 2,
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: (theme) => theme.palette.primary.main,
          textAlign: "start",
        }}
      >
        DANH SÁCH SINH VIÊN
      </Typography>

      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: (theme) => theme.palette.grey[700],
          textAlign: "start",
        }}
      >
        14 sinh viên
      </Typography>

      <MemberList />
    </Box>
  );
};

export default observer(ClassroomEverybody);
