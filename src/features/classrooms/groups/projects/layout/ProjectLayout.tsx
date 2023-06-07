import { Box, Grid } from "@mui/material";
import MiniClassroomDetails from "../../../details/MiniClassroomDetails";
import MiniGroupDetails from "./MiniGroupDetails";

interface ProjectLayoutProps {
  component: any
}

const ProjectLayout = (props: ProjectLayoutProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={3} key="mini-classroom-and-group-details">
          <MiniClassroomDetails />
          <MiniGroupDetails />
        </Grid>

        <Grid item xs={12} md={8} lg={9} key="main-project">
          {props.component}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectLayout;