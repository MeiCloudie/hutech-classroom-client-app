import { Box, Button, Grid, Typography } from "@mui/material";
import AnswerStatusList from "./list/AnswerStatusList";
import AnswerList from "./list/AnswerList";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TypoLoading from "../../../../app/layout/indicators/common/TypoLoading";
import MiniClassroomDetails from "../../details/MiniClassroomDetails";

const AnswerPage = () => {
  const { classroomId, exerciseId } = useParams<{
    classroomId: string;
    exerciseId: string;
  }>();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={3} key="answer-status-list">
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              component={Link}
              to={`/cr/${classroomId}/ex/${exerciseId}`}
            >
              QUAY VỀ
            </Button>
            <Typography variant="h6" fontWeight="bold" color="primary" mt={1}>
              TẤT CẢ CÂU TRẢ LỜI
            </Typography>
          </Box>
          <AnswerStatusList />
          <MiniClassroomDetails />
        </Grid>

        <Grid item xs={12} md={8} lg={9} key="answer-list">
          <AnswerList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnswerPage;
