import { runInAction } from "mobx";
import UserRelatedStore from "../common/stores/userRelatedStore";
import { Answer, AnswerFormValues } from "../models/Answer";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import agent from "../api/agent";
import { PaginationParams } from "../common/models/paginationPrams";

export default class AnswerStore extends UserRelatedStore<
  Answer,
  AnswerFormValues
> {
  exerciseAnswerResource: BaseHasManyRelationshipResource<Answer>;
  constructor() {
    super("Answers");

    this.exerciseAnswerResource =
      agent.createHasManyRelationshipResource<Answer>(
        "Exercises",
        "Answers"
      );
  }

  loadExerciseAnswers = async (
    exerciseId: string,
    params?: PaginationParams
  ) => {
    try {
      this.setListLoading(true);
      const items = await this.exerciseAnswerResource.listEntities(
        exerciseId,
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
