import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarContent from "./NavbarContent";
import { useStore } from "../../stores/store";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface NavbarProps {
  open?: boolean;
  handleDrawerOpen?: () => void;
}

const Navbar = (props: NavbarProps) => {
  const {
    userStore: { isLoggedIn },
  } = useStore();

  return (
    <AppBar position="fixed" open={props.open} sx={{ bgcolor: "#101331" }}>
      <Toolbar>
        {isLoggedIn && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(props.open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <NavbarContent />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
