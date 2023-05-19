import { ClassroomSemester } from "../layout/enums/ClassroomSemesters";
import { ClassroomTypes } from "../layout/enums/ClassroomTypes";
import Entity from "../common/models/Entity";
import Member from "../common/models/Member";

export interface Classroom extends Entity {
  title: string;
  room: string;
  type: ClassroomTypes;
  studyPeriod: string;
  class: string;
  schoolYear: string;
  semester: ClassroomSemester;
  description: string;
  studyGroup: string;
  practicalStudyGroup: string;

  subject?: Subject;
  faculty?: Faculty;
  lecturer?: User;
}

export class Classroom implements Classroom {
  id = "";
  title = "";
  room = "";
  type = ClassroomTypes.TheoryRoom;
  studyPeriod = "";
  class = "";
  schoolYear = "";
  semester = ClassroomSemester.I;
  description = "";
  studyGroup = "";
  practicalStudyGroup = "";
  createDate = new Date();

  subject?: Subject = undefined;
  faculty?: Faculty = undefined;
  lecturer?: Member = undefined;

  constructor(init?: ClassroomFormValues) {
    Object.assign(this, init);
  }
}

export class ClassroomFormValues {
  id?: string = undefined;
  title: string = "";
  room: string = "";
  type: ClassroomTypes = ClassroomTypes.TheoryRoom;
  studyPeriod: string = "";
  class: string = "";
  schoolYear: string = "";
  semester: ClassroomSemester = ClassroomSemester.I;
  description: string = "";
  studyGroup: string = "";
  practicalStudyGroup: string = "";
  createDate: Date = new Date();

  subject?: Subject = undefined;
  faculty?: Faculty = undefined;
  lecturer?: Member = undefined;

  constructor(classroom?: Classroom) {
    if (classroom) {
      this.id = classroom.id;
      this.title = classroom.title;
      this.room = classroom.room;
      this.type = classroom.type;
      this.studyPeriod = classroom.studyPeriod;
      this.class = classroom.class;
      this.schoolYear = classroom.schoolYear;
      this.semester = classroom.semester;
      this.description = classroom.description;
      this.studyGroup = classroom.studyGroup;
      this.practicalStudyGroup = classroom.practicalStudyGroup;
      this.createDate = classroom.createDate;
      this.subject = classroom.subject;
      this.lecturer = classroom.lecturer;
    }
  }
}
