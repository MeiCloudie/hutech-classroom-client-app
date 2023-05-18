import Entity from "./Entity";

export interface Classroom extends Entity {
    title: string,
    description: string,
    lecturerName: string,
    room: string,
    class: string,

    // createDate: Date,
    // groupName?: string,
    // processes: Process[]
}

export class Classroom implements Classroom {
    title = ''
    description = ''
    lecturerName = ''
    room = ''
    class = ''

    // createDate = new Date()
    // groupName?: string | undefined;
    // // processes: Process[] = []
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
            this.lecturerName = Classroom.lecturerName
            this.room = Classroom.room
            this.class = Classroom.class
            // this.createDate = Classroom.createDate
            // this.groupName = Classroom.groupName
        }
    }
}
