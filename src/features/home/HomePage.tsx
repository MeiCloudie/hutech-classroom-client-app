import { Box } from "@mui/material";
import IntroContent from "./IntroContent";
import NotificationContent from "./NotificationContent";
import LoginForm from "../users/forms/LoginForm";
import { useStore } from "../../app/stores/store";

const HomePage = () => {
  const { userStore } = useStore()
  return (
    <Box sx={{ textAlign: "left" }}>
      {userStore.isLoggedIn ? (
        <>
        <IntroContent />
        <NotificationContent />
        
        </>
      ) : (<LoginForm />)}
      
    </Box>
  );
};

export default HomePage;
