import * as React from "react"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import Avatar from "@mui/material/Avatar"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import { Link } from "react-router-dom"
import { store, useStore } from "../../stores/store"
import { router } from "../../router/Routes"
import { yellow } from "@mui/material/colors"
import { observer } from "mobx-react-lite"

const settings = [
  {
    text: "Hồ Sơ",
    link: "/profiles",
    handleClick: () => {
      router.navigate("/profiles")
    },
  },
  {
    text: "Cài Đặt",
    link: "/settings",
    handleClick: () => {
      router.navigate("/settings")
    },
  },
  {
    text: "Đăng Xuất",
    link: "/home",
    handleClick: () => {
      store.userStore.logout()
    },
  },
]

const MenuUserSettings = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const { userStore } = useStore()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <React.Fragment>
      <p>{store.userStore.user?.userName}&nbsp;&nbsp;</p>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Cài dặt">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="User Image"
              sx={{ bgcolor: yellow[800] }}
              src={userStore.user?.avatarUrl}
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                if (setting?.handleClick) setting.handleClick()
                handleCloseUserMenu()
              }}
              component={Link}
              to={setting.link}
            >
              <Typography textAlign="center">{setting.text}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </React.Fragment>
  )
}

export default observer(MenuUserSettings)
