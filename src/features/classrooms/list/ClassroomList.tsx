import React from "react";
import ClassroomCard from "./ClassroomCard";
import { Classroom } from "../../../app/models/Classroom";
// import { ClassroomTypes } from "../../../app/layout/enums/ClassroomTypes";
// import { ClassroomSemester } from "../../../app/layout/enums/ClassroomSemesters";
// import { Subject } from "../../../app/models/Subject";
// import { Major } from "../../../app/models/Major";
// import { Faculty } from "../../../app/models/Faculty";
// import Profile from "../../../app/common/models/Profile";

import { Grid, styled } from '@mui/material';
import { useStore } from "../../../app/stores/store";

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    '& .MuiGrid-item': {
      width: '100%',
    },
  },
  [theme.breakpoints.only('sm')]: {
    '& .MuiGrid-item': {
      width: '50%',
    },
  },
  [theme.breakpoints.up('md')]: {
    '& .MuiGrid-item': {
      width: '33.33%',
    },
  },
}));

// const types = ["Phòng Lý Thuyết", "Phòng Thực Hành"];
// const semesters = ["1", "2", "3"];

// const major: Major = {
//   id: "m1",
//   code: "7480201",
//   title: "Công Nghệ Thông Tin",
//   totalCredits: 152,
//   nonCumulativeCredits: 5,
//   createDate: new Date(2022, 11, 1),
// };

// const subject: Subject = {
//   id: "s1",
//   code: "CMP1024",
//   title: "Lập trình ứng dụng với Java",
//   totalCredits: 3,
//   createDate: new Date(2022, 11, 1),
//   major: major,
// };

// const faculty: Faculty = {
//   id: "s1",
//   name: "Khoa Công Nghệ Thông Tin",
//   createDate: new Date(2022, 11, 1),
// };

// const member: Profile = {
//   userName: "nguyenvana",
//   email: "nguyenvana@gmail.com",
//   firstName: "Nguyen Van",
//   lastName: "A",
// };

// const classrooms: Classroom[] = [
//   {
//     id: "c1",
//     title: "CMP1024",
//     room: "E1-09.05",
//     type: ClassroomTypes.TheoryRoom,
//     studyPeriod: "01/01/2023 - 06/06/2023",
//     class: "20DTHD3",
//     schoolYear: "2022",
//     semester: ClassroomSemester.II,
//     description: "Lập trình ứng dụng với Java",
//     studyGroup: "20",
//     practicalStudyGroup: "0",
//     createDate: new Date(2022, 11, 1),

//     subject: subject,
//     faculty: faculty,
//     lecturer: member,
//   },
//   {
//     id: "c2",
//     title: "CMP111",
//     room: "E1-09.05",
//     type: ClassroomTypes.TheoryRoom,
//     studyPeriod: "01/01/2023 - 06/06/2023",
//     class: "20DTHD3",
//     schoolYear: "2022",
//     semester: ClassroomSemester.II,
//     description: "Lập trình Web",
//     studyGroup: "20",
//     practicalStudyGroup: "0",
//     createDate: new Date(2022, 11, 1),

//     subject: subject,
//     faculty: faculty,
//     lecturer: member,
//   },
//   {
//     id: "c3",
//     title: "CMP222",
//     room: "E1-04.06/2",
//     type: ClassroomTypes.PracticeRoom,
//     studyPeriod: "01/01/2023 - 06/06/2023",
//     class: "20DTHD3",
//     schoolYear: "2022",
//     semester: ClassroomSemester.II,
//     description: "Thực Hành Lập trình Web",
//     studyGroup: "20",
//     practicalStudyGroup: "2",
//     createDate: new Date(2022, 11, 1),

//     subject: subject,
//     faculty: faculty,
//     lecturer: member,
//   },
// ];

const ClassroomList = () => {
  const { classroomStore } = useStore();
  const [ classrooms, setClassrooms ] = React.useState<Classroom[]>([]);
  React.useEffect(() => {
    classroomStore.load().then(() => {
      setClassrooms(classroomStore.items)
    })
  })
  return (
    <ResponsiveGrid container spacing={2}>
      {classrooms.map((c, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ClassroomCard key={index} classroom={c} />
        </Grid>
      ))}
    </ResponsiveGrid>
  );
};

export default ClassroomList;
