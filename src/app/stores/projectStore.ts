import { runInAction } from "mobx";
import agent from "../api/agent";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import { PaginationParams } from "../common/models/paginationPrams";
import UserRelatedStore from "../common/stores/userRelatedStore";
import { Project, ProjectFormValues } from "../models/Project";

export default class ProjectStore extends UserRelatedStore<
  Project,
  ProjectFormValues
> {
  groupProjectResource: BaseHasManyRelationshipResource<Project>;
  constructor() {
    super("Projects");

    this.groupProjectResource =
      agent.createHasManyRelationshipResource<Project>("Groups", "Projects");
  }

  loadGroupProjects = async (
    groupId: string,
    params?: PaginationParams
  ) => {
    try {
      this.setListLoading(true);
      const items = await this.groupProjectResource.listEntities(
        groupId,
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
