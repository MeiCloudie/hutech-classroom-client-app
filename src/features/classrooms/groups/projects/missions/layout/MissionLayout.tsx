import { Box, Grid } from "@mui/material";
import MiniClassroomDetails from "../../../../details/MiniClassroomDetails";
import MiniGroupDetails from "../../layout/MiniGroupDetails";
import MiniProjectDetails from "./MiniProjectDetails";

interface MissionLayoutProps {
  component: any
}

const MissionLayout = (props: MissionLayoutProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={3} key="mini-classroom-and-group-and-project-details">
          <MiniClassroomDetails />
          <MiniGroupDetails />
          <MiniProjectDetails />
        </Grid>

        <Grid item xs={12} md={8} lg={9} key="main-mission">
          {props.component}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MissionLayout;