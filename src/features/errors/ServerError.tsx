import { observer } from "mobx-react-lite";
import { Container, Typography } from "@mui/material";
import { useStore } from "../../app/stores/store";

const ServerError = () => {
  const { commonStore } = useStore();

  return (
    <Container>
      <Typography variant="h2" component="h2" fontWeight="bold" gutterBottom>
        Server Error
      </Typography>
      <Typography variant="h5" color="error" fontWeight="bold" gutterBottom>
        {commonStore.error?.message}
      </Typography>
      {commonStore.error?.details && (
        <Container>
          <Typography variant="h4" color="primary" gutterBottom>
            Stack trace
          </Typography>
          <code style={{ marginTop: "10px" }}>{commonStore.error.details}</code>
        </Container>
      )}
    </Container>
  );
};

export default observer(ServerError);
