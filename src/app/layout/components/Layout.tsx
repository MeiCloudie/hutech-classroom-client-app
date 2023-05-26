import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import HomePage from "../../../features/home/HomePage";
import { Outlet, useLocation, useParams } from "react-router-dom";
// import agent from '../../api/agent';
import { store, useStore } from "../../stores/store";
import EntityForm from "../../../features/common/forms/EntityForm";
import { Classroom, ClassroomFormValues } from "../../models/Classroom";
import { semesterOptions } from "../../common/options/semesterOptions";
import { classroomTypesOptions } from "../../common/options/classroomTypesOptions";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Layout = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const { classroomId, lecturerName } = useParams<{
    classroomId: string;
    lecturerName: string;
  }>();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { commonStore, userStore } = useStore();

  React.useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <></>;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginBottom: 10 }}>
        <DrawerHeader />
        {/* <EntityForm<Classroom, ClassroomFormValues>
          entityStore={store.classroomStore}
          entityId={classroomId}
          toFormValues={(entity) => new ClassroomFormValues(entity)}
          selectionFields={[
            { fieldKey: 'semester', options: semesterOptions },
            { fieldKey: 'type', options: classroomTypesOptions },
          ]}
          validateObject={{
            room: Yup.string().required('Vui lòng không để trống phòng học'),
            title: Yup.string().required('Vui lòng không để trống tên lớp'),
            class: Yup.string().required('Vui lòng không để trống lớp')
          }}
          fieldConfigs={[
            { fieldKey: 'room', props: { label: "Phòng", placeholder: "Hãy nhập phòng"}},
            { fieldKey: 'class', props: { label: "Lớp", placeholder: "Hãy nhập lớp"}},
            { fieldKey: 'title', props: { label: "Tên lớp", placeholder: "Hãy nhập tên lớp"}},
            { fieldKey: 'schoolYear', props: { label: "Năm học", placeholder: "Hãy nhập năm học"}},
            { fieldKey: 'description', props: { label: "Mô tả", placeholder: "Hãy nhập mô tả"}},
            { fieldKey: 'studyGroup', props: { label: "Nhóm học", placeholder: "Hãy nhập nhóm học"}},
            { fieldKey: 'topic', props: { label: "Chủ đề", placeholder: "Hãy nhập chủ đề"}},
          ]}
          excludeFields={['lecturerName', 'subjectId', 'facultyId']}
          onCreate={(entity) => {
            console.log(entity)
          }}
          onUpdate={() => { }}
          onSetAdditionalValues={(classroomFormValues) => { 
            classroomFormValues.lecturerName = lecturerName
            classroomFormValues.facultyId = "4cd60eae-356e-47eb-8f71-9a4487f81ea9"
            classroomFormValues.subjectId = "192e3661-2c5b-46bb-b342-dc5e56ca098d"
          }}
        /> */}
        {location.pathname === "/" ? <HomePage /> : <Outlet />}
      </Box>
      <Footer />
    </Box>
  );
};

export default observer(Layout);
