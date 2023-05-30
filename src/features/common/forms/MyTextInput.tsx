import { InputAdornment, TextField } from "@mui/material";
import { useField } from "formik";
import { v1 as uuidv1 } from 'uuid';

const MyTextInput = ({ label, icon, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <TextField
        {...field}
        {...props}
        helperText={meta.touched && meta.error}
        id={`${uuidv1()}-${props.name}-text-form`}
        label={label}
        variant="outlined"
        sx={{
          mt: 2,
          width: "100%",
          maxWidth: "100ch",
          "@media (max-width: 400px)": {
            width: "120ch",
            maxWidth: "100%",
          },
          "@media (min-width: 1280px)": {
            width: "100ch",
            maxWidth: "100%",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
        }}
        error={meta.touched && meta.error !== undefined}
      />
    </div>
  );
};

export default MyTextInput;
