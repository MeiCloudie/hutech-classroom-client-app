import { Checkbox } from "@mui/material";
import { useField } from "formik";

const MyCheckboxInput = ({ label, ...props }: any) => {
    const [field] = useField(props);
    return (
        <div>
            <Checkbox
                {...field}
                {...props}
                checked={field.value}
                id={`${props.name}-text-form`}
                variant="outlined"
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
        </div>
    );
};

export default MyCheckboxInput;