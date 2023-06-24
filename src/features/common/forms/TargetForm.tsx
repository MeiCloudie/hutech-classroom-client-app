import { Formik, Form, FormikHelpers } from "formik";
import MyDateInput from "./MyDateInput";
import { Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface TargetFormProps {
  onSubmit: (targetDate: Dayjs, actions: FormikHelpers<{ targetDate: Dayjs; }>) => void;
}

const TargetForm: React.FC<TargetFormProps> = ({ onSubmit }) => {
  const handleSubmit = (values: { targetDate: Dayjs; }, actions: FormikHelpers<{ targetDate: Dayjs; }>) => {
    onSubmit(values.targetDate!, actions);
  };

  return (
    <Formik
      initialValues={{ targetDate: dayjs() }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
      <Form>
        <MyDateInput name="targetDate" label="Ngày kết thúc" />

        <Button variant="contained" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Form>
            )}
    </Formik>
  );
};

export default TargetForm;