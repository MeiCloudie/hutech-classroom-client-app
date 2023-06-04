import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useField } from "formik";
import { v1 as uuidv1 } from 'uuid';

export interface MySelectionInputProps extends SelectProps {
  icon: React.ReactNode;
  options: MySelectionInputOption[];
}

export interface MySelectionInputOption {
  label: string,
  value: any
}

const MySelectionInput = (props: MySelectionInputProps) => {
  const [field, meta, helpers] = useField(props.name!);
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
      <InputLabel id={`${uuidv1()}-${props.name}-selection-form`}>{props.label}</InputLabel>
      <Select
        {...selectProps}
        {...field}
        
        value={field.value || null}
        onChange={(e) => helpers.setValue(e.target.value.value)}

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
      {showError && <p>{meta.error}</p>}
    </FormControl>
  );
};

export default MySelectionInput;
