import { InputAdornment, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useField } from "formik";

const MyTextAreaInput = ({ label, icon, ...props }: any) => {
  const [field, meta, helpers] = useField(props);

  const handleEditorChange = (content: string) => {
    helpers.setValue(content); // Update the field value manually
  };

  return (
    <div>
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        init={{
          plugins: [
            "autoresize",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "searchreplace",
            "insertdatetime",
            "table",
            "wordcount",
          ],
          menubar: false,
          toolbar:
            "undo redo" +
            "| formatselect " +
            "| bold italic " +
            "| forecolor  backcolor removeformat " +
            "| alignleft aligncenter alignright alignjustify " +
            "| bullist numlist outdent indent" +
            "| charmap link table searchreplace image",
        }}
        {...field}
        {...props}
        onEditorChange={handleEditorChange}
        helperText={meta.touched && meta.error}
        id={`${props.name}-text-form`}
        label={label}
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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
        }}
        error={meta.touched && meta.error !== undefined}
      />
      {meta.error && (
        <Typography variant="body2" color="#d32f2f" sx={{ m: "10px" }}>
          {meta.error}
        </Typography>
      )}
    </div>
  );
};

export default MyTextAreaInput;
