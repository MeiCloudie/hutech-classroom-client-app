import { runInAction } from "mobx";
import agent from "../api/agent";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import { PaginationParams } from "../common/models/paginationPrams";
import UserRelatedStore from "../common/stores/userRelatedStore";
import { Mission, MissionFormValues } from "../models/Mission";

export default class MissionStore extends UserRelatedStore<
  Mission,
  MissionFormValues
> {
  projectMissionResource: BaseHasManyRelationshipResource<Mission>;
  constructor() {
    super("Missions");

    this.projectMissionResource =
      agent.createHasManyRelationshipResource<Mission>("Projects", "Missions");
  }

  loadProjectMissions = async (
    projectId: string,
    params?: PaginationParams
  ) => {
    try {
      this.setListLoading(true);
      const items = await this.projectMissionResource.listEntities(
        projectId,
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
