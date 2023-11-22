import { ScoreType } from "./ScoreType"

export interface Score {
  ordinalNumber: number
  score: number

  scoreType?: ScoreType
}

export class Score implements Score {
  ordinalNumber = 0
  score = 0
  scoreType?: ScoreType = undefined

  constructor(init?: ScoreFormValues) {
    Object.assign(this, init)
  }
}

export class ScoreFormValues {
  ordinalNumber: number = 0
  score: number = 0
  scoreTypeId?: string = ""

  constructor(Score?: Score) {
    if (Score) {
      const { scoreType, ...rest } = Score
      Object.assign(this, { ...rest })
    }
  }
}
