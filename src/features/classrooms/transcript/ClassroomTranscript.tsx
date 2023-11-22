import { Box, Button, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"
import ScoreTable from "./ScoreTable"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import ScoreTypeForm from "./form/ScoreTypeForm"
import Modal from "../../common/UI/Modal"
import InfoIcon from "@mui/icons-material/Info"
import { Link, useParams } from "react-router-dom"

const ClassroomTranscript = () => {
  const { classroomId } = useParams<{
    classroomId: string
  }>()

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
            textAlign: "start",
          }}
        >
          BẢNG ĐIỂM SINH VIÊN
        </Typography>

        <Box>
          {/* <Modal
            key={"add-score-type"}
            buttonText="Thêm cột điểm"
            title="THÊM CỘT ĐIỂM MỚI"
            startIcon={<LibraryAddIcon />}
            component={(handleClose) => (
              <ScoreTypeForm handleClose={handleClose} />
            )}
          /> */}
          <Button
            sx={{ ml: 1 }}
            variant="contained"
            startIcon={<InfoIcon />}
            component={Link}
            to={`/cr/${classroomId}/tr/scoretypes`}
          >
            CHI TIẾT
          </Button>
        </Box>
      </Box>

      <ScoreTable />
    </Box>
  )
}

export default observer(ClassroomTranscript)
