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
      <FormControl sx={{ mb: 1, width: "100ch" }} variant="outlined">
        <InputLabel htmlFor={`outlined-adornment-${props.name}`}>
          {label}
        </InputLabel>
        <OutlinedInput
          {...field}
          {...props}
          id={`outlined-adornment-${props.name}`}
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
