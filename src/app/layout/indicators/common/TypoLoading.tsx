import { Box, LinearProgress, Typography } from "@mui/material";

const TypoLoading = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold">
        Loading...
      </Typography>
      <Box sx={{ mt: 2, width: "100%" }}>
        <LinearProgress />
      </Box>
    </Box>
  );
};

export default TypoLoading;
