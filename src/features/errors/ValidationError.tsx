import { Typography, Box, List, ListItem } from "@mui/material";

const ValidationError = ({ errors }: { errors: any[] }) => {
  return (
    <Box mt={2}>
      <Typography variant="body1" color="error">
        <List>
          {errors.map((err: any, i: any) => (
            <ListItem key={i}>{err}</ListItem>
          ))}
        </List>
      </Typography>
    </Box>
  );
};

export default ValidationError;
