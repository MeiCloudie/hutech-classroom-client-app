import { action, computed, makeObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import { PaginationParams } from "../common/models/paginationPrams";
import EntityStore from "../common/stores/entityStore";
import { Group, GroupFormValues } from "../models/Group";
import Profile from "../common/models/Profile";
import GroupRoleConstants from "../common/constants/GroupRoleConstants";

export default class GroupStore extends EntityStore<Group, GroupFormValues> {
  classroomGroupResource: BaseHasManyRelationshipResource<Group>;
  groupUserResource: BaseHasManyRelationshipResource<Profile>;
  groupResource: { addLeader: (groupId: string, userId: string) => Promise<unknown>}
  constructor() {
    super("Groups");

    makeObservable(this, {
      loadGroupUsers: action,
      groupUsers: computed,
      setGroupUsers: action,
      addUserItem: action,
      addUserItems: action,
      removeUserItem: action,
      removeUserItems: action,
      updateLeader: action,
      isLeader: action,
      isMember: action,
      isInGroup: action
    });

    this.classroomGroupResource =
      agent.createHasManyRelationshipResource<Group>("Classrooms", "Groups");
      this.groupUserResource =
      agent.createHasManyRelationshipResource<Profile>("Groups", "Members");
    this.groupResource =
      agent.Groups;
  }

  isLeader = (group?: Group) : boolean => {
    return group !== undefined && group.roles.some(x => x === GroupRoleConstants.LEADER);
  }


  isMember = (group?: Group) : boolean => {
    return group !== undefined && group.roles.some(x => x === GroupRoleConstants.MEMBER)
  }

  isInGroup = (group?: Group) : boolean => {
    return group !== undefined && group.roles.length > 0;
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

  addUserItem(user: Profile): void {
    if (!this.selectedItem) return;
    this.selectedItem.groupUsers.unshift(user);
  }

  addMember = async (user: Profile): Promise<void> => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return;
      await this.groupUserResource.addEntity(id, user.id);
      runInAction(() => {
        this.addUserItem(user);
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

  removeUserItem(user: Profile): void {
    if (!this.selectedItem) return;
    const itemIndex = this.selectedItem.groupUsers.findIndex((item) => item.id === user.id);
    this.selectedItem.groupUsers.splice(itemIndex, 1);
  }

  removeMember = async (user: Profile): Promise<void> => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return;
      await this.groupUserResource.removeEntity(id, user.id);
      runInAction(() => {
        this.removeUserItem(user);
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

  addUserItems(users: Profile[]): void {
    if (!this.selectedItem) return;
    this.selectedItem.groupUsers.unshift(...users);
  }

  addMembers = async (users: Profile[]): Promise<void> => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return;
      await this.groupUserResource.addEntities(id, users.map(u => u.id));
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
    
    this.selectedItem.groupUsers = this.selectedItem.groupUsers.filter(gu => !removeIds.includes(gu.id));
  }

  removeMembers = async (users: Profile[]): Promise<void> => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return;
      await this.groupUserResource.removeEntities(id, users.map(u => u.id));
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

  updateLeader(userId: string) {
    if (!this.selectedItem) return;
    const user = this.selectedItem?.groupUsers.find(u => u.id === userId);
    this.selectedItem.leader = user;
  }

  addLeader = async (userId: string) : Promise<void> => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return;
      await this.groupResource.addLeader(id, userId);
      runInAction(() => {
        this.updateLeader(userId);
      });
      // toast.success("Bạn đã cập nhật thành công!", toastBasic);
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      runInAction(() => {
        this.setDetailsLoading(false);
      });
    }
  }
}
