import BaseEntityStore from "../common/stores/baseEntityStore"
import { ScoreType, ScoreTypeFormValues } from "../models/ScoreType"

export default class ScoreTypeStore extends BaseEntityStore<
number,
ScoreType,
  ScoreTypeFormValues
> {
  constructor() {
    super("ScoreTypes")
  }
}
