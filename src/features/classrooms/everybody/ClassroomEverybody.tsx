import React from "react";
import { useStore } from "../../../app/stores/store";
import { Classroom, ClassroomFormValues } from "../../../app/models/Classroom";
import { Box, Button, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import MemberList from "./MemberList";
import MiniClassroomDetails from "../details/MiniClassroomDetails";

const ClassroomEverybody = () => {
  const { classroomStore, facultyStore, subjectStore, postStore } = useStore();
  const [classrooms, setClassrooms] = React.useState<Classroom[]>([]);
  React.useEffect(() => {
    console.log("Render");
    Promise.all([
      postStore.load(),
      classroomStore.get("4369943e-050e-4ef5-af26-64d94f38660f"),
      classroomStore.loadUserRelatedItems(),
      facultyStore.load(),
      subjectStore.load(),
    ])
    .then(() => {
      console.log(classroomStore.selectedItem)

      Promise.all([
        classroomStore.get(classroomStore.items[classroomStore.items.length - 1].id),
        postStore.get(postStore.items[postStore.items.length - 1].id)
      ])
      .then(() => {

        Promise.all([
          classroomStore.loadClassroomUsers(),
          postStore.loadComments()
        ])
        .then(() => {
          console.log(classroomStore.classroomUsers)
          var classroomFormValues = new ClassroomFormValues(
            classroomStore.items[classroomStore.items.length - 1]
          );
          console.log(classroomFormValues);
          setClassrooms(classroomStore.items);
        })
      });
    })
    
  }, []);
  const testCreate = () => {
    var lastClassroom = classroomStore.items[classroomStore.items.length - 1];
    console.log("Last classroom");
    console.log(lastClassroom);
    var classroomFormValues = new ClassroomFormValues(lastClassroom);
    classroomFormValues.description = new Date().toString();
    console.log("Last classroom form values");
    console.log(classroomFormValues);
    classroomFormValues.facultyId =
      facultyStore.items[facultyStore.items.length - 1].id;
    classroomFormValues.lecturerName = "lecturer2";
    classroomFormValues.subjectId =
      subjectStore.items[subjectStore.items.length - 1].id;
    classroomStore.create(classroomFormValues).then((classroom) => {
      console.log("Created classroom");
      console.log(classroom);
    });
  };
  const testUpdate = () => {
    var lastClassroom = classroomStore.items[classroomStore.items.length - 1];
    console.log("Last classroom");
    console.log(lastClassroom);
    var classroomFormValues = new ClassroomFormValues(lastClassroom);
    classroomFormValues.description = new Date().toString();
    classroomStore
      .update(classroomFormValues.id!, classroomFormValues)
      .then(() => {
        console.log("Updated classroom");
        console.log(
          classroomStore.items.find((x) => x.id === classroomFormValues.id!)
        );
      });
  };
  const testDelete = () => {
    var lastClassroom = classroomStore.items[classroomStore.items.length - 1];
    console.log("Last classroom");
    console.log(lastClassroom);
    var classroomFormValues = new ClassroomFormValues(lastClassroom);
    classroomStore.delete(classroomFormValues.id!).then((classroom) => {
      console.log("Deleted classroom");
      console.log(classroom);
    });
  };
  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        p: 2,
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: (theme) => theme.palette.primary.main,
          textAlign: "start",
        }}
      >
        DANH SÁCH SINH VIÊN
      </Typography>

      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: (theme) => theme.palette.grey[700],
          textAlign: "start",
        }}
      >
        14 sinh viên
      </Typography>

      <MemberList />
      {/* <Button onClick={testCreate}>Test Create</Button>
            <Button onClick={testUpdate}>Test Update</Button>
            <Button onClick={testDelete}>Test Delete</Button>
            {classrooms.map(c => <div key={c.id}>{c.id} --- Description {c.description}</div>)} */}
    </Box>
  );
};

export default observer(ClassroomEverybody);
