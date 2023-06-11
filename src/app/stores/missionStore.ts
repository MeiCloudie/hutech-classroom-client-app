import { action, computed, makeObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import { PaginationParams } from "../common/models/paginationPrams";
import UserRelatedStore from "../common/stores/userRelatedStore";
import { Mission, MissionFormValues } from "../models/Mission";
import Profile from "../common/models/Profile";

export default class MissionStore extends UserRelatedStore<
  Mission,
  MissionFormValues
> {
  projectMissionResource: BaseHasManyRelationshipResource<Mission>;
  missionUserResource: BaseHasManyRelationshipResource<Profile>;
  constructor() {
    super("Missions");
    
    makeObservable(this, {
      loadMissionUsers: action,
      missionUsers: computed,
      setMissionUsers: action,
    });

    this.projectMissionResource =
      agent.createHasManyRelationshipResource<Mission>("Projects", "Missions");
      this.missionUserResource =
      agent.createHasManyRelationshipResource<Profile>("Missions", "Members");
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

  get missionUsers(): Profile[] {
    return this.selectedItem?.missionUsers ?? [];
  }

  setMissionUsers(items: Profile[]): void {
    if (!this.selectedItem) return;
    this.selectedItem.missionUsers = [];
    this.selectedItem.missionUsers.push(...items);
  }

  loadMissionUsers = async (
    params?: PaginationParams
  ): Promise<Profile[]> => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return [];
      const items = await this.missionUserResource.listEntities(id, params);
      runInAction(() => {
        this.setMissionUsers(items);
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

  addUserItems(users: Profile[]): void {
    if (!this.selectedItem) return;
    this.selectedItem.missionUsers.unshift(...users);
  }

  addMembers = async (users: Profile[]): Promise<void> => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return;
      await this.missionUserResource.addEntities(id, users.map(u => u.id));
      runInAction(() => {
        this.addUserItems(users);
      });
      // toast.success("Bạn đã cập nhật thành công!", toastBasic);
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      runInAction(() => {
        this.setDetailsLoading(false);
      });
    }
  };

  removeUserItems(users: Profile[]): void {
    if (!this.selectedItem) return;
    const removeIds = users.map(u => u.id);
    
    this.selectedItem.missionUsers = this.selectedItem.missionUsers.filter(gu => !removeIds.includes(gu.id));
  }

  removeMembers = async (users: Profile[]): Promise<void> => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return;
      await this.missionUserResource.removeEntities(id, users.map(u => u.id));
      runInAction(() => {
        this.removeUserItems(users);
      });
      // toast.success("Bạn đã cập nhật thành công!", toastBasic);
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      runInAction(() => {
        this.setDetailsLoading(false);
      });
    }
  };
}
