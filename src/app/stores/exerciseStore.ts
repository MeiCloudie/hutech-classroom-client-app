import UserRelatedStore from "../common/stores/userRelatedStore";
import { Exercise, ExerciseFormValues } from "../models/Exercise";

export default class ExerciseStore extends UserRelatedStore<
  Exercise,
  ExerciseFormValues
> {
  constructor() {
    super("Exercises");
  }
}
