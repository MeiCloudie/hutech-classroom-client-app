import { action, computed, makeObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import { PaginationParams } from "../common/models/paginationPrams";
import EntityStore from "../common/stores/entityStore";
import { Group, GroupFormValues } from "../models/Group";
import Profile from "../common/models/Profile";

export default class GroupStore extends EntityStore<Group, GroupFormValues> {
  classroomGroupResource: BaseHasManyRelationshipResource<Group>;
  groupUserResource: BaseHasManyRelationshipResource<Profile>;
  constructor() {
    super("Groups");

    makeObservable(this, {
      loadGroupUsers: action,
      groupUsers: computed,
      setGroupUsers: action,
    });

    this.classroomGroupResource =
      agent.createHasManyRelationshipResource<Group>("Classrooms", "Groups");
      this.groupUserResource =
      agent.createHasManyRelationshipResource<Profile>("Groups", "Members");
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

  get groupUsers(): Profile[] {
    return this.selectedItem?.groupUsers ?? [];
  }

  setGroupUsers(items: Profile[]): void {
    if (!this.selectedItem) return;
    this.selectedItem.groupUsers = [];
    this.selectedItem.groupUsers.push(...items);
  }

  loadGroupUsers = async (
    params?: PaginationParams
  ): Promise<Profile[]> => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return [];
      const items = await this.groupUserResource.listEntities(id, params);
      runInAction(() => {
        this.setGroupUsers(items);
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
