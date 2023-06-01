import { Box, Divider, Skeleton } from "@mui/material";

const PostDetailsSkeleton = () => {
  return (
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Skeleton
            animation="wave"
            height={40}
            style={{ marginBottom: 6 }}
            width="15%"
          />

          <Box sx={{ display: "flex" }}>
            <Skeleton
              variant="rounded"
              width={120}
              height={40}
              sx={{ mr: 1 }}
            />
            <Skeleton variant="rounded" width={120} height={40} />
          </Box>
        </Box>

        <Skeleton
          animation="wave"
          height={20}
          style={{ marginBottom: 6 }}
          width="30%"
        />

        <Divider />

        <Box sx={{ mb: 2 }}>
          <Skeleton
            animation="wave"
            height={40}
            style={{ marginTop: 6, marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={40}
            style={{ marginBottom: 6 }}
            width="80%"
          />
          <Skeleton
            animation="wave"
            height={40}
            style={{ marginBottom: 6 }}
            width="60%"
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
            width="30%"
            sx={{ m: "10px 30px" }}
          />
          <Skeleton
            animation="wave"
            height={30}
            width="30%"
            sx={{ m: "10px 30px" }}
          />
          <Skeleton
            animation="wave"
            height={30}
            width="30%"
            sx={{ m: "10px 30px" }}
          />
        </Box>

        <Divider />

        <Skeleton variant="rounded" width={120} height={40} sx = {{ mt : 1}}/>
      </Box>
  );
};

export default PostDetailsSkeleton;
