import { Formik, FormikHelpers } from "formik";
import { Box, Button, Stack } from "@mui/material";
import Profile from "../../../../../../../app/common/models/Profile";
import { useStore } from "../../../../../../../app/stores/store";
import MyMultipleSelectCheckmarkInput from "../../../../../../common/forms/MyMultipleSelectCheckmarkInput";
;

interface MissionMembersFormProps {
  groupUsers: Profile[];
  missionUsers: Profile[];
}

const MissionMembersForm = (props: MissionMembersFormProps) => {
  const { missionStore } = useStore();

  const handleFormSubmit = (
    formValues: { ids: string[] },
    actions: FormikHelpers<{ ids: string[] }>
  ) => {
    const addIds = props.groupUsers.filter(
      (user) =>
        formValues.ids.includes(user.id) &&
        !props.missionUsers.map((mi) => mi.id).includes(user.id)
    );
    const removeIds = props.missionUsers.filter(
      (user) => !formValues.ids.includes(user.id)
    );
    missionStore.addMembers(addIds).then(() => {});
    missionStore
      .removeMembers(removeIds)
      .then(() => {})
      .then(() => {});
    actions.setSubmitting(false);
  };

  return (
    <Formik
      key="formik-form"
      enableReinitialize
      initialValues={{ ids: props.missionUsers.map((user) => user.id) }}
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
            options={props.groupUsers.map((user) => ({
              label: user.lastName + " " + user.firstName,
              value: user.id,
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

export default MissionMembersForm;
