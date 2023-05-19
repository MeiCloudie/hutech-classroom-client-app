import { ClassroomSemester } from "../layout/enums/ClassroomSemesters";
import { ClassroomTypes } from "../layout/enums/ClassroomTypes";
import Entity from "./Entity";

export interface Classroom extends Entity {
    title: string,
    room: string,
    type: ClassroomTypes,
    studyPeriod: string,
    class: string,
    schoolYear: string,
    semester: ClassroomSemester,
    description: string,
    studyGroup: string,
    practicalStudyGroup: string,


}

export class Classroom implements Classroom {
    title = ''
    room = ''
    type = ClassroomTypes.TheoryRoom
    studyPeriod = ''
    class = ''
    schoolYear = ''
    semester = ClassroomSemester.I
    description = ''
    studyGroup = ''
    practicalStudyGroup = ''

    constructor(init?: ClassroomFormValues) {
        Object.assign(this, init)
    }
}

export class ClassroomFormValues {
    id?: string = undefined
    title?: string = undefined
    description: string = ''
    lecturerName: string = ''
    room: string = ''
    class: string = ''
    // createDate: Date = new Date()
    // groupName?: string = ''

    constructor(Classroom?: Classroom) {
        if (Classroom) {
            this.id = Classroom.id
            this.title = Classroom.title
            this.description = Classroom.description
            // this.lecturerName = Classroom.lecturerName
            this.room = Classroom.room
            this.class = Classroom.class
            // this.createDate = Classroom.createDate
            // this.groupName = Classroom.groupName
        }
    }
}
