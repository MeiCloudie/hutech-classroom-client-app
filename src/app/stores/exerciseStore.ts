import { runInAction } from "mobx";
import UserRelatedStore from "../common/stores/userRelatedStore";
import { Exercise, ExerciseFormValues } from "../models/Exercise";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import agent from "../api/agent";
import { PaginationParams } from "../common/models/paginationPrams";

export default class ExerciseStore extends UserRelatedStore<
  Exercise,
  ExerciseFormValues
> {
  classroomExerciseResource: BaseHasManyRelationshipResource<Exercise>;
  constructor() {
    super("Exercises");

    this.classroomExerciseResource =
      agent.createHasManyRelationshipResource<Exercise>(
        "Classrooms",
        "Exercises"
      );
  }

  loadClassroomExercises = async (
    classroomId: string,
    params?: PaginationParams
  ) => {
    try {
      this.setListLoading(true);
      const items = await this.classroomExerciseResource.listEntities(
        classroomId,
        params
      );
      runInAction(() => {
        this.setItems(items);
      });
      return items;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    } finally {
      runInAction(() => {
        this.setListLoading(false);
      });
    }
  };
}
