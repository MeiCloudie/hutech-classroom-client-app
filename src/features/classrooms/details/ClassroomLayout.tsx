import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import InfoIcon from "@mui/icons-material/Info";
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ClassroomLayout = () => {
  const [value, setValue] = React.useState(0);

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
          sx = {{ height: "60px" }}
        >
          <Tab
            icon={<InfoIcon />}
            iconPosition="start"
            label="THÔNG TIN LỚP"
            {...a11yProps(0)}
          />
          <Tab
            icon={<GroupsIcon />}
            iconPosition="start"
            label="MỌI NGƯỜI"
            {...a11yProps(1)}
          />
          <Tab
            icon={<NotificationsIcon />}
            iconPosition="start"
            label="THÔNG BÁO"
            {...a11yProps(2)}
          />
          <Tab
            icon={<AssignmentIcon />}
            iconPosition="start"
            label="BÀI TẬP"
            {...a11yProps(3)}
          />
          <Tab
            icon={<PeopleIcon />}
            iconPosition="start"
            label="NHÓM"
            {...a11yProps(4)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item FOUR
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item FIVE
      </TabPanel>
    </Box>
  );
};

export default ClassroomLayout;
