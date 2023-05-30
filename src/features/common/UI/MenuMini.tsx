import { Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface MenuMiniProps {
  id: string;
  anchorEl: HTMLElement | null;
  handleCloseMenu: () => void;
  options: {
    text: string;
    link?: string;
  }[];
}

const MenuMini = (props: MenuMiniProps) => {
  return (
    <Menu
      sx={{ mt: "45px" }}
      id={props.id}
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(props.anchorEl)}
      onClose={props.handleCloseMenu}
    >
      {props.options.map((option, index) => {
        if (option.link) {
          return (
            <MenuItem
              key={index}
              onClick={props.handleCloseMenu}
              component={Link}
              to={option.link}
            >
              <Typography textAlign="center">{option.text}</Typography>
            </MenuItem>
          );
        } else {
          return (
            <MenuItem key={index} onClick={props.handleCloseMenu}>
              <Typography textAlign="center">{option.text}</Typography>
            </MenuItem>
          );
        }
      })}
    </Menu>
  );
};

export default MenuMini;
