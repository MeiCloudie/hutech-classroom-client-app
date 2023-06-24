import { Box } from "@mui/material";
import IntroContent from "./IntroContent";
import NotificationContent from "./NotificationContent";
import { useStore } from "../../app/stores/store";
import LoginPage from "../users/LoginPage";
import CountdownDatetime from "../common/components/CountdownDatetime";

const HomePage = () => {
  const { userStore } = useStore();
  return (
    <Box sx={{ textAlign: "left" }}>
      {userStore.isLoggedIn ? (
        <>
          <IntroContent />
          <NotificationContent />
          <CountdownDatetime />
        </>
      ) : (
        <LoginPage />
      )}
    </Box>
  );
};

export default HomePage;
