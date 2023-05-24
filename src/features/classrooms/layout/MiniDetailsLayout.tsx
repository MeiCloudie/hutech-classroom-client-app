import { Box, Grid } from "@mui/material";
import MiniClassroomDetails from "../details/MiniClassroomDetails";

interface MiniDetailsLayoutProps {
  component: any
}

const MiniDetailsLayout = (props: MiniDetailsLayoutProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={3} key="mini-classroom-details">
          <MiniClassroomDetails />
        </Grid>

        <Grid item xs={12} md={8} lg={9} key="main-classroom-everybody">
          {props.component}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MiniDetailsLayout;
