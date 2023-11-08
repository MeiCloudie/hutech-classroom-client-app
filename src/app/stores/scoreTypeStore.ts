import EntityStore from "../common/stores/entityStore"
import { ScoreType, ScoreTypeFormValues } from "../models/ScoreType"

export default class ScoreTypeStore extends EntityStore<
  ScoreType,
  ScoreTypeFormValues
> {
  constructor() {
    super("ScoreTypes")
  }
}
