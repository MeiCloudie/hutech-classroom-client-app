import React from "react";
import { useStore } from "../../../app/stores/store";
import { Classroom, ClassroomFormValues } from "../../../app/models/Classroom";
import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";

const ClassroomEverybody = () => {
    const { classroomStore, facultyStore, subjectStore } = useStore()
    const [ classrooms, setClassrooms ] = React.useState<Classroom[]>([])
    React.useEffect(() => {
        console.log("Render")
        Promise.all([
            classroomStore.load(),
            facultyStore.load(),
            subjectStore.load()
        ])
        .then(() => {
            var classroomFormValues = new ClassroomFormValues(classroomStore.items[classroomStore.items.length - 1])
            console.log(classroomFormValues)
            setClassrooms(classroomStore.items)
        })
    }, [])
    const testCreate = () => {
        var lastClassroom = classroomStore.items[classroomStore.items.length - 1];
        console.log("Last classroom")
        console.log(lastClassroom)
        var classroomFormValues = new ClassroomFormValues(lastClassroom)
        classroomFormValues.description = new Date().toString()
        console.log("Last classroom form values")
        console.log(classroomFormValues)
        classroomFormValues.facultyId = facultyStore.items[facultyStore.items.length - 1].id
        classroomFormValues.lecturerName = "lecturer2"
        classroomFormValues.subjectId = subjectStore.items[subjectStore.items.length - 1].id
        classroomStore.create(classroomFormValues).then((classroom) => {
            console.log("Created classroom")
            console.log(classroom)
        })
    }
    const testUpdate = () => {
        var lastClassroom = classroomStore.items[classroomStore.items.length - 1];
        console.log("Last classroom")
        console.log(lastClassroom)
        var classroomFormValues = new ClassroomFormValues(lastClassroom)
        classroomFormValues.description = new Date().toString()
        classroomStore.update(classroomFormValues.id!, classroomFormValues).then(() => {
            console.log("Updated classroom")
            console.log(classroomStore.items.find(x => x.id === classroomFormValues.id!))
        })
    }
    const testDelete = () => {
        var lastClassroom = classroomStore.items[classroomStore.items.length - 1];
        console.log("Last classroom")
        console.log(lastClassroom)
        var classroomFormValues = new ClassroomFormValues(lastClassroom)
        classroomStore.delete(classroomFormValues.id!).then((classroom) => {
            console.log("Deleted classroom")
            console.log(classroom)
        })
    }
    return (
        <>
            <h1>ClassroomEverybody</h1>
            <Button onClick={testCreate}>Test Create</Button>
            <Button onClick={testUpdate}>Test Update</Button>
            <Button onClick={testDelete}>Test Delete</Button>
            {classrooms.map(c => <div key={c.id}>{c.id} --- Description {c.description}</div>)}
        </>
    )
}

export default observer(ClassroomEverybody);