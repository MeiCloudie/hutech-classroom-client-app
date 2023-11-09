import Profile from "../common/models/Profile"
import { Classroom } from "./Classroom"
import { ScoreType } from "./ScoreType"

export interface StudentResult {
  ordinalNumber: number
  score: number

  user?: Profile
  classroom?: Classroom
  scoreType?: ScoreType
}

export class StudentResult implements StudentResult {
  ordinalNumber = 0
  score = 0
  user?: Profile = undefined
  classroom?: Classroom = undefined
  scoreType?: ScoreType = undefined

  constructor(init?: StudentResultFormValues) {
    Object.assign(this, init)
  }
}

export class StudentResultFormValues {
  ordinalNumber: number = 0
  score: number = 0
  userId?: string = ""
  classroomId?: string = ""
  scoreTypeId?: string = ""

  constructor(studentResult?: StudentResult) {
    if (studentResult) {
      const { user, classroom, scoreType, ...rest } = studentResult
      Object.assign(this, { ...rest })
    }
  }
}
