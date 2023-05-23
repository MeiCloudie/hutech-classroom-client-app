import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";
import { useField } from "formik";

const MyPasswordForm = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <FormControl
        sx={{ mt: 2, width: "100ch" }}
        variant="outlined"
        error={meta.touched && meta.error !== undefined}
      >
        <InputLabel htmlFor={`${props.name}-password-form`}>{label}</InputLabel>
        <OutlinedInput
          {...field}
          {...props}
          id={`${props.name}-password-form`}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
        {meta.touched && meta.error ? (
          <FormHelperText>{meta.error}</FormHelperText>
        ) : null}
      </FormControl>
    </div>
  );
};

export default MyPasswordForm;