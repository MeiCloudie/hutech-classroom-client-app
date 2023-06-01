import { Box, Divider, Skeleton } from "@mui/material";

const ClassroomDetailsSkeleton = () => {
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
      <Box sx={{ display: "flex", mb: 1 }}>
        <Skeleton animation="wave" height={40} width="20%" />
      </Box>

      <Divider />

      <Box sx={{ textAlign: "start", m: "20px 0" }}>
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="50%"
        />
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="45%"
        />
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="40%"
        />
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="35%"
        />
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="30%"
        />
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="25%"
        />
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="20%"
        />
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="15%"
        />
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="10%"
        />
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="10%"
        />
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="10%"
        />
      </Box>

      <Divider />

      <Box sx={{ textAlign: "start", m: "20px 0" }}>
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="30%"
        />
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="20%"
        />
      </Box>

      <Divider />

      <Box sx={{ textAlign: "start", m: "20px 0" }}>
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="30%"
        />
        <Skeleton
          animation="wave"
          height={30}
          style={{ marginTop: 6, marginBottom: 6 }}
          width="20%"
        />
      </Box>
    </Box>
  );
};

export default ClassroomDetailsSkeleton;
