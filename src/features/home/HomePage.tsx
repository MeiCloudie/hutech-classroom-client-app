import { Box } from "@mui/material";
import IntroContent from "./IntroContent";
import NotificationContent from "./NotificationContent";

const HomePage = () => {
  return (
    <Box sx={{ textAlign: "left" }}>
      <IntroContent />
      <NotificationContent />
    </Box>
  );
};

export default HomePage;
