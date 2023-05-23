import { Box, TextField } from "@mui/material";

interface AccountFormProps {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

const AccountForm = (props: AccountFormProps) => {
  return (
    <Box sx={{ width: "100ch" }}>
      <TextField
        id={props.id}
        label="Tài khoản"
        variant="outlined"
        value={props.userName}
        fullWidth
        sx={{ marginTop: 2 }}
        InputProps={{
          readOnly: true,
        }}
      />

      <TextField
        id={props.id}
        label="Họ tên"
        variant="outlined"
        value={`${props.firstName} ${props.lastName}`}
        fullWidth
        sx={{ marginTop: 2 }}
        InputProps={{
          readOnly: true,
        }}
      />

      <TextField
        id={props.id}
        label="Email"
        variant="outlined"
        value={props.email}
        fullWidth
        sx={{ marginTop: 2 }}
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
  );
};

export default AccountForm;
