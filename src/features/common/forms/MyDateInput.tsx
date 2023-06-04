import { useField, useFormikContext } from "formik";
import {
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const MyDateInput = ({ label, ...props }: any) => {
  const [field] = useField(props);
  const { setFieldValue } = useFormikContext()
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          {...field}
          value={dayjs(field.value)}
          onChange={(value) => setFieldValue(field.name, dayjs(value))}
          label={label}
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
        />
      </LocalizationProvider>
      {/* {meta.error && (
        <Typography variant="body2" color="#d32f2f" sx={{ m: "10px" }}>
          {meta.error}
        </Typography>
      )} */}
    </div>
  );
};

export default MyDateInput;
