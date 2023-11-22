import Profile from "../common/models/Profile"
import { Classroom } from "./Classroom"
import { Score } from "./Score"

export interface ClassroomScore {

  student?: Profile
  classroom?: Classroom
  scores: Score[]
}

export class ClassroomScore implements ClassroomScore {
  student?: Profile = undefined
  classroom?: Classroom = undefined
  scores: Score[] = []

  constructor(init?: ClassroomScoreFormValues) {
    Object.assign(this, init)
  }
}

export class ClassroomScoreFormValues {
  studentId?: string = ""
  classroomId?: string = ""

  constructor(ClassroomScore?: ClassroomScore) {
    if (ClassroomScore) {
      const { student, classroom, scores, ...rest } = ClassroomScore
      Object.assign(this, { ...rest })
    }
  }
}
