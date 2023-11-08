import Entity, { Auditable } from "../common/models/Entity"

export interface ScoreType extends Entity, Auditable {
  id: string
  createDate: Date
  name: string
}

export class ScoreType implements ScoreType {
  id = ""
  createDate = new Date()
  name = ""

  constructor(init?: ScoreTypeFormValues) {
    Object.assign(this, init)
  }
}

export class ScoreTypeFormValues {
  id?: string = ""
  name: string = ""

  constructor(scoreType?: ScoreType) {
    if (scoreType) {
      const { createDate, ...rest } = scoreType
      Object.assign(this, { ...rest })
    }
  }
}
