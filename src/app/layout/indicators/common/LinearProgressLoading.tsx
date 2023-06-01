import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { CardMedia } from "@mui/material";

const LinearProgressLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CardMedia
          component="img"
          image="/logo-hutech-classroom.png"
          alt="Ảnh không tồn tại"
          sx={{
            width: "35%",
            height: "auto",
          }}
        />
      </Box>
      <Box sx={{ mt: 2, width: "20%" }}>
        <LinearProgress />
      </Box>
    </Box>
  );
};

export default LinearProgressLoading;
