import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import InfoIcon from "@mui/icons-material/Info";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import ClassroomDetails from "../details/ClassroomDetails";
import ClassroomEverybody from "../everybody/ClassroomEverybody";
import PostPage from "../posts/list/PostPage";
import ExercisePage from "../exercises/list/ExercisePage";
import GroupPage from "../groups/list/GroupPage";
import { Link, useLocation } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

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
  );
}

function a11yProps(index: number) {
  return {
    id: `classroom-tab-${index}`,
    "aria-controls": `classroom-tabpanel-${index}`,
  };
}

const ClassroomLayout = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (location.pathname.includes("/cr/:id/everybody")) {
      setValue(1);
    } else if (location.pathname.includes("/cr/:id/posts")) {
      setValue(2);
    } else if (location.pathname.includes("/cr/:id/exercises")) {
      setValue(3);
    } else if (location.pathname.includes("/cr/:id/groups")) {
      setValue(4);
    } else {
      setValue(0);
    }
  }, [location.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
            to="/cr/:id"
            {...a11yProps(0)}
          />
          <Tab
            icon={<GroupsIcon />}
            iconPosition="start"
            label="MỌI NGƯỜI"
            component={Link}
            to="/cr/:id/everybody"
            {...a11yProps(1)}
          />
          <Tab
            icon={<NotificationsIcon />}
            iconPosition="start"
            label="THÔNG BÁO"
            component={Link}
            to="/cr/:id/posts"
            {...a11yProps(2)}
          />
          <Tab
            icon={<AssignmentIcon />}
            iconPosition="start"
            label="BÀI TẬP"
            component={Link}
            to="/cr/:id/exercises"
            {...a11yProps(3)}
          />
          <Tab
            icon={<PeopleIcon />}
            iconPosition="start"
            label="NHÓM"
            component={Link}
            to="/cr/:id/groups"
            {...a11yProps(4)}
          />
        </Tabs>
      </Box>

      <Box component="main">
        <TabPanel value={value} index={0}>
          <ClassroomDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ClassroomEverybody />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PostPage />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ExercisePage />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <GroupPage />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default ClassroomLayout;
