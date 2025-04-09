import { Box, Button, Grid, Typography } from '@mui/material';
import MiniClassroomDetails from '../../../details/MiniClassroomDetails';
import MiniExerciseDetails from './MiniExerciseDetails';
import AnswerStatusList from '../list/AnswerStatusList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from 'react-router-dom';

interface AnswerLayoutProps {
    component: any;
}

const AnswerLayout = (props: AnswerLayoutProps) => {
    const { classroomId, exerciseId } = useParams<{
        classroomId: string;
        exerciseId: string;
    }>();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid
                    size={{ xs: 12, md: 4, lg: 3 }}
                    key='mini-classroom-and-exercise-details'
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 2,
                        }}
                    >
                        <Button
                            variant='contained'
                            startIcon={<ArrowBackIcon />}
                            component={Link}
                            to={`/cr/${classroomId}/ex/${exerciseId}`}
                        >
                            BÀI TẬP
                        </Button>
                        <Typography
                            variant='h6'
                            fontWeight='bold'
                            color='primary'
                            mt={1}
                        >
                            XEM CHI TIẾT
                        </Typography>
                    </Box>
                    <AnswerStatusList />
                    <MiniExerciseDetails />
                    <MiniClassroomDetails />
                </Grid>

                <Grid size={{ xs: 12, md: 8, lg: 9 }} key='main-answer'>
                    {props.component}
                </Grid>
            </Grid>
        </Box>
    );
};

export default AnswerLayout;
