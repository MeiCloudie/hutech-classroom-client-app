import { action, computed, makeObservable, runInAction } from "mobx";
import UserRelatedStore from "../common/stores/userRelatedStore";
import { Exercise, ExerciseFormValues } from "../models/Exercise";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import agent from "../api/agent";
import { PaginationParams } from "../common/models/paginationPrams";
import Profile from "../common/models/Profile";

export default class ExerciseStore extends UserRelatedStore<
  Exercise,
  ExerciseFormValues
> {
  classroomExerciseResource: BaseHasManyRelationshipResource<Exercise>;
  exerciseUserResource: BaseHasManyRelationshipResource<Profile>;
  constructor() {
    super("Exercises");

    makeObservable(this, {
      loadExerciseUsers: action,
      exerciseUsers: computed,
      setExerciseUsers: action,
    });

    this.classroomExerciseResource =
      agent.createHasManyRelationshipResource<Exercise>(
        "Classrooms",
        "Exercises"
      );
    this.exerciseUserResource =
      agent.createHasManyRelationshipResource<Profile>("Exercises", "Members");
  }

  get exerciseUsers(): Profile[] {
    return this.selectedItem?.exerciseUsers ?? [];
  }

  setExerciseUsers(items: Profile[]): void {
    if (!this.selectedItem) return;
    this.selectedItem.exerciseUsers = [];
    this.selectedItem.exerciseUsers.push(...items);
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

  loadExerciseUsers = async (params?: PaginationParams): Promise<Profile[]> => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return [];
      const items = await this.exerciseUserResource.listEntities(id, params);
      runInAction(() => {
        this.setExerciseUsers(items);
      });
      return items;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    } finally {
      runInAction(() => {
        this.setDetailsLoading(false);
      });
    }
  };
}
