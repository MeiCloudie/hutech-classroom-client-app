import { ClassroomSemester } from "../layout/enums/ClassroomSemesters";
import { ClassroomTypes } from "../layout/enums/ClassroomTypes";
import Entity, { Auditable, EntityFormValues } from "../common/models/Entity";
import Profile from "../common/models/Profile";
import { Subject } from "./Subject";
import { Faculty } from "./Faculty";
import { Post } from "./Post";

export interface Classroom extends Entity, Auditable {
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
  posts: Post[];
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
  posts: Post[] = [];

  constructor(init?: ClassroomFormValues) {
    Object.assign(this, init);
    this.classroomUsers = [];
    this.posts = [];
  }
}

export class ClassroomFormValues implements EntityFormValues {
  id?: string = "";
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

  subjectId?: string = "";
  facultyId?: string = "";
  lecturerId?: string = "";

  constructor(classroom?: Classroom) {
    if (classroom) {
      const { subject, faculty, lecturer, createDate, ...rest } = classroom;
      Object.assign(this, { ...rest });
    }
  }
}
