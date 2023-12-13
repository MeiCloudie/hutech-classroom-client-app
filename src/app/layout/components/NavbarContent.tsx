import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CardMedia from "@mui/material/CardMedia"
import MenuUserSettings from "./MenuUserSettings"
import { useStore } from "../../stores/store"
import { IconButton, InputBase, Paper } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useLocation } from "react-router-dom"
import { PaginationParams } from "../../common/models/paginationPrams"

const NavbarContent = () => {
  const {
    userStore: { isLoggedIn },
    // commonStore,
    classroomStore,
  } = useStore()

  const searchString = React.useRef("")

  const location = useLocation()
  const isClassroomPath = location.pathname.split("/")[1] === "classrooms"

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchString.current = event.target.value
  }

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
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: { md: "right" },
          px: 2,
        }}
        onSubmit={(event) => {
          event.preventDefault()
          classroomStore
            .loadUserRelatedItems(
              new PaginationParams(1, 10, searchString.current)
            )
            .then(() => {
              // commonStore.setSearchString(undefined)
            })
        }}
      >
        {isClassroomPath && (
          <Paper
            component="form"
            sx={{
              p: "0.2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Tìm phòng học..."
              inputProps={{ "aria-label": "search classroom" }}
              onChange={onChange}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => {
                classroomStore
                  .loadUserRelatedItems(
                    new PaginationParams(1, 10, searchString.current)
                  )
                  .then(() => {
                    // commonStore.setSearchString(undefined)
                  })
              }}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        )}
      </Box>

      {isLoggedIn && <MenuUserSettings />}
    </React.Fragment>
  )
}

export default NavbarContent
