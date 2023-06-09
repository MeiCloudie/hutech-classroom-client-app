import { Box, Grid } from "@mui/material";
import AnswerStatusList from "./list/AnswerStatusList";
import AnswerList from "./list/AnswerList";

const AnswerPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={3} key="answer-status-list">
          <AnswerStatusList />
        </Grid>

        <Grid item xs={12} md={8} lg={9} key="answer-list">
          <AnswerList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnswerPage;
