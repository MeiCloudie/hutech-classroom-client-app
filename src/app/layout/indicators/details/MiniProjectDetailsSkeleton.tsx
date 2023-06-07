import { Box, Divider, Skeleton } from "@mui/material";

const MiniProjectDetailsSkeleton = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        p: 2,
        mt: 2,
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", pb: 1 }}>
        <Skeleton animation="wave" height={40} width="40%" />

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

        <Skeleton
          variant="rounded"
          width={20}
          height={20}
          sx={{ mt: 1, mr: 1 }}
        />
      </Box>

      <Divider />

      <Box sx={{ m: "20px 0" }}>
        <Skeleton
          animation="wave"
          height={50}
          style={{ marginTop: 4, marginBottom: 4 }}
        />
      </Box>

      <Divider />

      <Box sx={{ m: "20px 0" }}>
        <Skeleton
          animation="wave"
          height={40}
          style={{ marginTop: 6, marginBottom: 6 }}
        />
      </Box>
    </Box>
  );
};

export default MiniProjectDetailsSkeleton;
