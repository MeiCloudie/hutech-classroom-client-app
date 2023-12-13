import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CardMedia } from "@mui/material";
import InformationTab from "./tabs/InformationTab";
import ChangePasswordTab from "./tabs/ChangePasswordTab";
import AccountInfoTab from "./tabs/AccountInfoTab";
import ChangeEmailTab from "./tabs/ChangeEmaiTab";
import UpdateAvatarTab from "./tabs/UpdateAvatarTab";

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
      id={`setting-tabpanel-${index}`}
      aria-labelledby={`setting-tab-${index}`}
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
    id: `setting-tab-${index}`,
    "aria-controls": `setting-tabpanel-${index}`,
  };
}

const SettingPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "#f5f5f5",
        display: "flex",
        height: 500,
        p: 2,
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          label={
            <CardMedia
              component="img"
              image="logoHutech.png"
              alt="Ảnh không tồn tại"
              sx={{
                width: "150px",
                height: "auto",
                margin: "10px 80px",
              }}
            />
          }
          {...a11yProps(0)}
        />
        <Tab
          label="Tài khoản"
          {...a11yProps(1)}
          sx={{
            "&:hover": {
              backgroundColor: "#e5e5e5",
            },
          }}
        />
        <Tab
          label="Mật khẩu"
          {...a11yProps(2)}
          sx={{
            "&:hover": {
              backgroundColor: "#e5e5e5",
            },
          }}
        />
        <Tab
          label="Email"
          {...a11yProps(3)}
          sx={{
            "&:hover": {
              backgroundColor: "#e5e5e5",
            },
          }}
        />
        <Tab
          label="Hình Đại Diện"
          {...a11yProps(4)}
          sx={{
            "&:hover": {
              backgroundColor: "#e5e5e5",
            },
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <InformationTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AccountInfoTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ChangePasswordTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ChangeEmailTab />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <UpdateAvatarTab />
      </TabPanel>
    </Box>
  );
};

export default SettingPage;
