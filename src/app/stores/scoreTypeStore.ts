import { action, computed, makeObservable, runInAction } from "mobx";
import UserRelatedStore from "../common/stores/userRelatedStore";
import { ScoreType, ScoreTypeFormValues } from "../models/ScoreType";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import agent from "../api/agent";
import Profile from "../common/models/Profile";

export default class ScoreTypeStore extends UserRelatedStore<
  ScoreType,
  ScoreTypeFormValues
> {
  classroomScoreTypeResource: BaseHasManyRelationshipResource<ScoreType>;
  scoreTypeUserResource: BaseHasManyRelationshipResource<Profile>;
  constructor() {
    super("ScoreTypes");

    makeObservable(this, {

    });

    this.classroomScoreTypeResource =
      agent.createHasManyRelationshipResource<ScoreType>(
        "Classrooms",
        "ScoreTypes"
      );
    this.scoreTypeUserResource =
      agent.createHasManyRelationshipResource<Profile>("ScoreTypes", "Members");
  }

}
