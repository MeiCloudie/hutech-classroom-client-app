import { Box, Typography } from "@mui/material"
import MiniDetailsLayout from "../layout/MiniDetailsLayout"

const ScoreTypePage = () => {
  return (
    <Box>
      <MiniDetailsLayout
        component={
          <Box
            sx={{
              bgcolor: "#f5f5f5",
              p: 2,
              mb: 2,
              border: "1px solid #e8e8e8",
              borderRadius: "5px",
              transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
              "&:hover": {
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                transform: "translateY(-4px)",
              },
              textAlign: "start",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: (theme) => theme.palette.primary.main,
                textAlign: "start",
              }}
            >
              DANH SÁCH CÁC CỘT ĐIỂM
            </Typography>
            
          </Box>
        }
      />
    </Box>
  )
}

export default ScoreTypePage
