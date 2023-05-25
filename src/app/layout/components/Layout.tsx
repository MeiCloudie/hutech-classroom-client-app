import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import HomePage from '../../../features/home/HomePage';
import { Outlet, useLocation } from 'react-router-dom';
// import agent from '../../api/agent';
import { store, useStore } from '../../stores/store';
import EntityForm from '../../../features/common/forms/EntityForm';
import { Faculty, FacultyFormValues } from '../../models/Faculty';
import { Classroom, ClassroomFormValues } from '../../models/Classroom';
import { Exercise, ExerciseFormValues } from '../../models/Exercise';
import { Mission, MissionFormValues } from '../../models/Mission';
import MySelectionInput from '../../../features/common/forms/MySelectionInput';
import { semesterOptions } from '../../common/options/semesterOptions';
import { classroomTypesOptions } from '../../common/options/classroomTypesOptions';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Layout = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { commonStore, userStore } = useStore()

  React.useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginBottom: 10 }}>
        <DrawerHeader />
        <EntityForm<Classroom, ClassroomFormValues>
          entityStore={store.classroomStore}
          toFormValues={(entity) => new ClassroomFormValues(entity)}
          entityId='4369943e-050e-4ef5-af26-64d94f38660f'
          modifyFields={[
            { fieldKey: 'semester', options: semesterOptions },
            { fieldKey: 'type', options: classroomTypesOptions },
          ]}
          onCreate={() => { }}
          onUpdate={() => { }}
          onSetAdditionalValues={(classroomFormValues) => { }}
        />
        {location.pathname === '/' ? <HomePage /> : <Outlet />}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
