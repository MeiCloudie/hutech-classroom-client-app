import React from "react";
import { useStore } from "../../../app/stores/store";
import { ClassroomFormValues } from "../../../app/models/Classroom";

const ClassroomEverybody = () => {
    const { classroomStore } = useStore()
    React.useEffect(() => {
        classroomStore.load()
        .then(() => {
            var classroomFormValues = new ClassroomFormValues(classroomStore.items.pop())
            console.log(classroomFormValues)
        })
    })
    return (
        <h1>ClassroomEverybody</h1>
    )
}

export default ClassroomEverybody;