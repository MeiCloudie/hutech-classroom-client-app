import { Auditable, BaseEntity } from "../common/models/Entity"

export interface ScoreType extends BaseEntity<number>, Auditable {
  id: number
  createDate: Date
  name: string
}

export class ScoreType implements ScoreType {
  id = 0
  createDate = new Date()
  name = ""

  constructor(init?: ScoreTypeFormValues) {
    Object.assign(this, init)
  }
}

export class ScoreTypeFormValues {
  id?: number = undefined
  name: string = ""

  constructor(scoreType?: ScoreType) {
    if (scoreType) {
      const { createDate, ...rest } = scoreType
      Object.assign(this, { ...rest })
    }
  }
}
