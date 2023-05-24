import { InputAdornment, TextField } from "@mui/material";
import { useField } from "formik";

const MyTextForm = ({ label, icon, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <TextField
      {...field}
      {...props}
      helperText={meta.touched ?? meta.error}
      id={`${props.name}-text-form`}
      label={label}
      variant="outlined"
      sx={{ mt: 2, width: "100ch" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
    />
  );
};

export default MyTextForm;
