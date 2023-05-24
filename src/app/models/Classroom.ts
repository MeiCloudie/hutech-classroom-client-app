import { ClassroomSemester } from "../layout/enums/ClassroomSemesters";
import { ClassroomTypes } from "../layout/enums/ClassroomTypes";
import Entity, { EntityFormValues } from "../common/models/Entity";
import Profile from "../common/models/Profile";
import { Subject } from "./Subject";
import { Faculty } from "./Faculty";

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
  lecturer?: Profile;

  classroomUsers: Profile[];
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
  lecturer?: Profile = undefined;

  classroomUsers: Profile[] = [];

  constructor(init?: ClassroomFormValues) {
    Object.assign(this, init);
  }
}

export class ClassroomFormValues implements EntityFormValues {
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

  subjectId?: string = undefined;
  facultyId?: string = undefined;
  lecturerName?: string = undefined;

  constructor(classroom?: Classroom) {
    if (classroom) {
      const { subject, faculty, lecturer, ...rest} = classroom
      Object.assign(this, {...rest })
    }
  }
}