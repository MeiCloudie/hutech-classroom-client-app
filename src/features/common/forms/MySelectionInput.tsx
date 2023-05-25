import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useField } from "formik";

export interface MySelectionFormProps extends SelectProps {
  icon: React.ReactNode;
  options: { label: string; value: any }[];
}

const MySelectionInput = (props: MySelectionFormProps) => {
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
      <InputLabel id={`${props.name}-selection-form`}>{props.label}</InputLabel>
      <Select
        {...selectProps}
        {...field}
        id={`${props.name}-selection-form`}
        labelId={`${props.name}-selection-form`}
        error={showError}
        startAdornment={
          <InputAdornment position="start">{icon}</InputAdornment>
        }
      >
        {options.map((option: { label: string; value: any }) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {showError && <p>{meta.error}</p>}
    </FormControl>
  );
};

export default MySelectionInput;
