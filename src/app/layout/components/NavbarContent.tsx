import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import MenuUserSettings from "./MenuUserSettings";
import { useStore } from "../../stores/store";

const NavbarContent = () => {
  const {
    userStore: { isLoggedIn },
  } = useStore();

  return (
    <React.Fragment>
      {/* LOGO */}
      <CardMedia
        component="img"
        image="/logoHutech.png"
        alt="Ảnh không tồn tại"
        sx={{
          width: "35px",
          height: "auto",
        }}
      />

      {/* TITLE */}
      <Typography
        variant="h6"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          ml: 2,
          display: { xs: "none", md: "flex" },
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        HUTECH CLASSROOM
      </Typography>

      {/* RESPONSIVE */}
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        HUTECH CLASSROOM
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {/* some contents */}
      </Box>

      {isLoggedIn && <MenuUserSettings />}
    </React.Fragment>
  );
};

export default NavbarContent;
