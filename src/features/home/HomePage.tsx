import {
  Box,
  // Divider,
  // Typography
} from "@mui/material"
import IntroContent from "./IntroContent"
import NotificationContent from "./NotificationContent"
import { useStore } from "../../app/stores/store"
import LoginPage from "../users/LoginPage"
// import CountdownDatetime from "../common/components/CountdownDatetime";

const HomePage = () => {
  const { userStore } = useStore()
  return (
    <Box sx={{ textAlign: "left" }}>
      {userStore.isLoggedIn ? (
        <>
          <IntroContent />
          <NotificationContent />

          {/* <Divider />
          <Typography variant="h5" color={"blue"} mt={2} fontWeight={"bold"}>
            Phần test demo:
          </Typography>
          <CountdownDatetime /> */}
        </>
      ) : (
        <LoginPage />
      )}
    </Box>
  )
}

export default HomePage
