import { Box, CardMedia, Typography } from "@mui/material";

interface PlaceholderBoxProps {
  title: string;
  subtitle: string;
}

const PlaceholderBox = (props: PlaceholderBoxProps) => {
  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        mt: 2,
        mb: 2,
        p: 2,
        width: "100%",
        border: "2px solid #1565c0",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
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
      <Typography variant="h5" color="primary" fontWeight="bold">
        {props.title}
      </Typography>
      <em>
        <Typography
          variant="body1"
          color="gray"
          fontWeight="bold"
          sx={{ mt: 1 }}
        >
          {props.subtitle}
        </Typography>
      </em>
    </Box>
  );
};

export default PlaceholderBox;
