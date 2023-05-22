import BaseUserStore from "../common/stores/baseUserStore";
import { Classroom, ClassroomFormValues } from "../models/Classroom";

export default class ClassroomStore extends BaseUserStore<Classroom, ClassroomFormValues> {
    constructor() {
        super("Classrooms")
    }
}