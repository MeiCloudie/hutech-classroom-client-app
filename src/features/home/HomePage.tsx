import { Box } from "@mui/material";
import IntroContent from "./IntroContent";
import NotificationContent from "./NotificationContent";
import LoginForm from "../users/forms/LoginForm";

const HomePage = () => {
  return (
    <Box sx={{ textAlign: "left" }}>
      <IntroContent />
      <NotificationContent />
      <LoginForm />
    </Box>
  );
};

export default HomePage;
