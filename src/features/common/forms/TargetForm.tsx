import { Formik, Form } from "formik";
import MyDateInput from "./MyDateInput";
import { Button } from "@mui/material";

interface FormValues {
  targetDate: Date | null;
}

interface TargetFormProps {
  onSubmit: (targetDate: Date) => void;
}

const TargetForm: React.FC<TargetFormProps> = ({ onSubmit }) => {
  const handleSubmit = (values: FormValues) => {
    onSubmit(values.targetDate!);
  };

  return (
    <Formik<FormValues>
      initialValues={{ targetDate: null }}
      onSubmit={handleSubmit}
    >
      <Form>
        <MyDateInput name="targetDate" label="Target Date" />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default TargetForm;
