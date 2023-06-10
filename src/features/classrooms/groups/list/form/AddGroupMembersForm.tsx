import { Formik, FormikHelpers } from "formik";
import Profile from "../../../../../app/common/models/Profile";
import MyMultipleSelectCheckmarkInput from "../../../../common/forms/MyMultipleSelectCheckmarkInput";
import * as Yup from "yup";
import { Box, Button, Stack } from "@mui/material";
import { useStore } from "../../../../../app/stores/store";

interface AddGroupMembersFormProps {
  classroomUsers: Profile[];
  groupUsers: Profile[];
}

const AddGroupMembersForm = (props: AddGroupMembersFormProps) => {
  const { groupStore } = useStore();

  const handleFormSubmit = (
    formValues: { ids: string[] },
    actions: FormikHelpers<{ ids: string[] }>
  ) => {
    const addIds = props.classroomUsers.filter(user => formValues.ids.includes(user.id) && !props.groupUsers.map(gu => gu.id).includes(user.id))
    const removeIds = props.groupUsers.filter(user => !formValues.ids.includes(user.id))
    groupStore
      .addMembers(
        addIds
      )
      .then(() => {});
    Promise.all(removeIds.map(id => groupStore.removeMember(id)))
    .then(() => {})
    actions.setSubmitting(false);
  };

  const onCancel = () => {};

  const validationSchema = {
    // ids: Yup.object(),
  };

  return (
    <Formik
      key="formik-form"
      enableReinitialize
      initialValues={{ ids: props.groupUsers.map(user => user.id) }}
      onSubmit={handleFormSubmit}
      // validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box
          component="form"
          noValidate
          autoComplete="true"
          onSubmit={handleSubmit}
        >
          <MyMultipleSelectCheckmarkInput
            name="ids"
            options={props.classroomUsers.map((user) => ({
              label: user.lastName + " " + user.firstName,
              value: user.id
            }))}
          />

          <Stack sx={{ width: "100%" }} spacing={2}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Stack spacing={2} direction="row">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ m: "10px 0" }}
                >
                  {"LƯU"}
                </Button>
              </Stack>
            </div>
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default AddGroupMembersForm;
