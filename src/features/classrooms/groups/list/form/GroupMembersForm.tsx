import { Formik, FormikHelpers } from "formik";
import Profile from "../../../../../app/common/models/Profile";
import MyMultipleSelectCheckmarkInput from "../../../../common/forms/MyMultipleSelectCheckmarkInput";
import { Box, Button, Stack } from "@mui/material";
import { useStore } from "../../../../../app/stores/store";
import { useParams } from "react-router-dom";
import { Group } from "../../../../../app/models/Group";

interface GroupMembersFormProps {
  classroomUsers: Profile[];
  groupUsers: Profile[];
  group?: Group;
}

const GroupMembersForm = (props: GroupMembersFormProps) => {
  const { groupStore } = useStore();
  const { groupId } = useParams<{ groupId: string }>();

  const handleFormSubmit = (
    formValues: { ids: string[] },
    actions: FormikHelpers<{ ids: string[] }>
  ) => {
    const addIds = props.classroomUsers.filter(
      (user) =>
        formValues.ids.includes(user.id) &&
        !props.groupUsers.map((gu) => gu.id).includes(user.id)
    );
    const removeIds = props.groupUsers.filter(
      (user) => !formValues.ids.includes(user.id)
    );
    groupStore.addMembers(addIds).then(() => {});
    groupStore
      .removeMembers(removeIds)
      .then(() => {})
      .then(() => {});
    actions.setSubmitting(false);
  };

  return (
    <Formik
      key="formik-form"
      enableReinitialize
      initialValues={{ ids: props.groupUsers.map((user) => user.id) }}
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
            label="Thành viên nhóm"
            name="ids"
            options={props.classroomUsers
              .filter(
                (u) =>
                  (u.groups.some((g) => g.id === groupId) ||
                    u.groups.length === 0) &&
                  u.id !== props.group?.leader?.id
              )
              .map((user) => ({
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

export default GroupMembersForm;
