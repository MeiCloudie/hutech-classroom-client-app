import Profile from "../../../../../app/common/models/Profile";

interface AddGroupMembersFormProps {
  classroomUsers: Profile[];
}

const AddGroupMembersForm = (props: AddGroupMembersFormProps) => {
  return <>
    {props.classroomUsers.map((user) => (<div>{user.userName}</div>))}
  </>;
};

export default AddGroupMembersForm;
