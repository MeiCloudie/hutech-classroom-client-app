import * as React from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

import InfoIcon from "@mui/icons-material/Info"
import AssignmentIcon from "@mui/icons-material/Assignment"
import GroupsIcon from "@mui/icons-material/Groups"
import NotificationsIcon from "@mui/icons-material/Notifications"
import PeopleIcon from "@mui/icons-material/People"
import FeedIcon from "@mui/icons-material/Feed"
import ClassroomDetails from "../details/ClassroomDetails"
import ClassroomEverybody from "../everybody/ClassroomEverybody"
import PostPage from "../posts/list/PostPage"
import ExercisePage from "../exercises/list/ExercisePage"
import GroupPage from "../groups/list/GroupPage"
import { Link, useLocation, useParams } from "react-router-dom"
import MiniDetailsLayout from "./MiniDetailsLayout"
import ClassroomTranscript from "../transcript/ClassroomTranscript"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`classroom-tabpanel-${index}`}
      aria-labelledby={`classroom-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `classroom-tab-${index}`,
    "aria-controls": `classroom-tabpanel-${index}`,
  }
}

const pages = [
  {
    index: 1,
    component: <ClassroomEverybody />,
  },
  {
    index: 2,
    component: <PostPage />,
  },
  {
    index: 3,
    component: <ExercisePage />,
  },
  {
    index: 4,
    component: <GroupPage />,
  },
  {
    index: 5,
    component: <ClassroomTranscript />,
  },
]

const ClassroomLayout = () => {
  const location = useLocation()
  const { classroomId } = useParams<{ classroomId: string }>()
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    if (location.pathname.includes(`/cr/${classroomId}/everybody`)) {
      setValue(1)
    } else if (location.pathname.includes(`/cr/${classroomId}/posts`)) {
      setValue(2)
    } else if (location.pathname.includes(`/cr/${classroomId}/exercises`)) {
      setValue(3)
    } else if (location.pathname.includes(`/cr/${classroomId}/groups`)) {
      setValue(4)
    } else if (location.pathname.includes(`/cr/${classroomId}/transcript`)) {
      setValue(5)
    } else {
      setValue(0)
    }
  }, [location.pathname, classroomId])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
          centered
          sx={{ height: "60px" }}
        >
          <Tab
            icon={<InfoIcon />}
            iconPosition="start"
            label="THÔNG TIN LỚP"
            component={Link}
            to={`/cr/${classroomId}`}
            {...a11yProps(0)}
          />
          <Tab
            icon={<GroupsIcon />}
            iconPosition="start"
            label="THÀNH VIÊN"
            component={Link}
            to={`/cr/${classroomId}/everybody`}
            {...a11yProps(1)}
          />
          <Tab
            icon={<NotificationsIcon />}
            iconPosition="start"
            label="THÔNG BÁO"
            component={Link}
            to={`/cr/${classroomId}/posts`}
            {...a11yProps(2)}
          />
          <Tab
            icon={<AssignmentIcon />}
            iconPosition="start"
            label="BÀI TẬP"
            component={Link}
            to={`/cr/${classroomId}/exercises`}
            {...a11yProps(3)}
          />
          <Tab
            icon={<PeopleIcon />}
            iconPosition="start"
            label="NHÓM"
            component={Link}
            to={`/cr/${classroomId}/groups`}
            {...a11yProps(4)}
          />
          <Tab
            icon={<FeedIcon />}
            iconPosition="start"
            label="BẢNG ĐIỂM"
            component={Link}
            to={`/cr/${classroomId}/transcript`}
            {...a11yProps(5)}
          />
        </Tabs>
      </Box>

      <Box component="main">
        <TabPanel value={value} index={0}>
          <ClassroomDetails />
        </TabPanel>
        {pages.map((p, i) => (
          <TabPanel key={i} value={value} index={p.index}>
            <MiniDetailsLayout component={p.component} />
          </TabPanel>
        ))}
      </Box>
    </Box>
  )
}

export default ClassroomLayout
