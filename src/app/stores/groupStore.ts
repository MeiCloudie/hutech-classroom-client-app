import { runInAction } from "mobx";
import agent from "../api/agent";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import { PaginationParams } from "../common/models/paginationPrams";
import EntityStore from "../common/stores/entityStore";
import { Group, GroupFormValues } from "../models/Group";

export default class GroupStore extends EntityStore<Group, GroupFormValues> {
  classroomGroupResource: BaseHasManyRelationshipResource<Group>;

  constructor() {
    super("Groups");

    this.classroomGroupResource =
      agent.createHasManyRelationshipResource<Group>("Classrooms", "Groups");
  }

  loadClassroomGroups = async (
    classroomId: string,
    params?: PaginationParams
  ) => {
    try {
      this.setListLoading(true);
      const items = await this.classroomGroupResource.listEntities(
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
