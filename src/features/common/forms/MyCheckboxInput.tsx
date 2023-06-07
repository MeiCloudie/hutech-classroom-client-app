import { Checkbox, FormControlLabel } from "@mui/material";
import { useField } from "formik";
import { v1 as uuidv1 } from "uuid";

const MyCheckboxInput = ({ label, ...props }: any) => {
  const [field] = useField(props);
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            {...props}
            checked={field.value}
            id={`${uuidv1()}-${props.name}-text-form`}
            variant="outlined"
            aria-label={label}
          />
        }
        label={label}
      />
    </div>
  );
};

export default MyCheckboxInput;
