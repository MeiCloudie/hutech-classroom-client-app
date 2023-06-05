import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  // SelectChangeEvent,
  // SelectProps,
  Typography,
} from "@mui/material";
import { useField } from "formik";
import { ReactNode } from "react";
import { v1 as uuidv1 } from "uuid";

export interface MySelectionInputProps {
  icon: React.ReactNode;
  options: MySelectionInputOption[];
  name: string,
  label?: ReactNode
}

export interface MySelectionInputOption {
  label: string;
  value: any;
}

const MySelectionInput = (props: MySelectionInputProps) => {
  const [field, meta] = useField(props.name!);
  const { icon, options, ...selectProps } = props;
  const showError = meta.touched && !!meta.error;
  return (
    <FormControl
      fullWidth
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
    >
      <InputLabel id={`${uuidv1()}-${props.name}-selection-form`}>
        {props.label}
      </InputLabel>
      <Select
        {...selectProps}
        {...field}
        value={field.value ?? options[0].value}
        id={`${props.name}-selection-form`}
        labelId={`${props.name}-selection-form`}
        error={showError}
        startAdornment={
          <InputAdornment position="start">{icon}</InputAdornment>
        }
      >
        {options.map((option: { label: string; value: any }, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {showError && (
        <Typography variant="body2" color="#d32f2f" sx={{ m: "10px" }}>
          {meta.error}
        </Typography>
      )}
    </FormControl>
  );
};

export default MySelectionInput;
