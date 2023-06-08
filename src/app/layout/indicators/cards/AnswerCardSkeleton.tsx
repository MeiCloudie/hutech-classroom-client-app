import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Skeleton,
} from "@mui/material";

const AnswerCardSkeleton = () => {
  return (
    <Card
      sx={{
        maxWidth: 420,
        width: "100%",
        height: "100%",
        textAlign: "start",
        borderWidth: 2,
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
        position: "relative",
      }}
      variant="outlined"
    >
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        action={null}
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <CardContent>
        <Skeleton
          animation="wave"
          height={10}
          width="10%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton
          animation="wave"
          height={10}
          width="70%"
          style={{ marginBottom: 6 }}
        />
      </CardContent>
      <Divider />
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Skeleton variant="rounded" width={40} height={40} />
      </CardActions>
    </Card>
  );
};

export default AnswerCardSkeleton;
