import { Box, Divider, Skeleton } from "@mui/material";
import AnswerLayout from "../../../../features/classrooms/exercises/answers/layout/AnswerLayout";

const AnswerDetailsSkeleton = () => {
  return (
    <AnswerLayout
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

          <Box
            sx={{
              mb: 1,
            }}
          >
            <Skeleton
              animation="wave"
              height={10}
              width="30%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="40%" sx={{ mb: 2 }} />
          </Box>

          <Divider />

          <Box sx={{ mt: 2, mb: 2 }}>
            <Box sx={{ display: "flex", mb: 1 }}>
              <Skeleton
                animation="wave"
                height={20}
                width="5%"
                style={{ marginBottom: 6, marginRight: 4 }}
              />
              <Skeleton
                animation="wave"
                height={20}
                width="5%"
                style={{ marginBottom: 6 }}
              />
            </Box>

            <Divider />

            <Skeleton
              animation="wave"
              height={20}
              width="10%"
              style={{ marginBottom: 6, marginTop: 8 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
          </Box>

          <Divider />

          <Skeleton
            animation="wave"
            height={20}
            width="10%"
            style={{ marginBottom: 6, marginTop: 8 }}
          />
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} style={{ marginBottom: 15 }} />

          <Divider />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton
              variant="rounded"
              width={120}
              height={40}
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>
      }
    />
  );
};

export default AnswerDetailsSkeleton;
