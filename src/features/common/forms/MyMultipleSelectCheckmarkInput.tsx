import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { ReactNode, useState } from "react";
import { useField } from "formik";
import { Typography } from "@mui/material";
import { v1 as uuidv1 } from "uuid";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export interface MyMultipleSelectCheckmarkInputProps {
  icon: React.ReactNode;
  options: MyMultipleSelectCheckmarkInputOption[];
  name: string;
  label?: ReactNode;
}

export interface MyMultipleSelectCheckmarkInputOption {
  label: string;
  value: any;
}

const MyMultipleSelectCheckmarkInput: React.FC<
  MyMultipleSelectCheckmarkInputProps
> = (props) => {
  const [field, meta] = useField(props.name);
  const { icon, options, ...selectProps } = props;
  const showError = meta.touched && !!meta.error;
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  const uuid = uuidv1();

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(value as any[]);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`${uuid}-${props.name}-multiple-checkbox-label`}>
          {props.label}
        </InputLabel>
        <Select
          labelId={`${uuid}-${props.name}-multiple-checkbox-label`}
          id={`${uuid}-${props.name}-multiple-checkbox`}
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput label={props.label?.toString()} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={selectedValues.indexOf(option.value) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {showError && (
        <Typography variant="body2" color="#d32f2f" sx={{ m: "10px" }}>
          {meta.error}
        </Typography>
      )}
    </div>
  );
};

export default MyMultipleSelectCheckmarkInput;
