import { action, computed, makeObservable, runInAction } from "mobx";
import { Classroom, ClassroomFormValues } from "../models/Classroom";
import { PaginationParams } from "../common/models/paginationPrams";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import Profile from "../common/models/Profile";
import agent from "../api/agent";
import UserRelatedStore from "../common/stores/userRelatedStore";
import { Post } from "../models/Post";

export default class ClassroomStore extends UserRelatedStore<
  Classroom,
  ClassroomFormValues
> {
  classroomUserResource: BaseHasManyRelationshipResource<Profile>;
  postResource: BaseHasManyRelationshipResource<Post>;
  constructor() {
    super("Classrooms");

    makeObservable(this, {
      loadClassroomUsers: action,
      classroomUsers: computed,
      posts: computed,
      loadPosts: action,
      setClassroomUsers: action,
      setPosts: action
    });

    this.classroomUserResource =
      agent.createHasManyRelationshipResource<Profile>("Classrooms", "Members");
    this.postResource =
      agent.createHasManyRelationshipResource<Post>("Classrooms", "Posts");
  }

  get classroomUsers(): Profile[] {
    return this.selectedItem?.classroomUsers ?? [];
  }
  
  setClassroomUsers(items: Profile[]): void {
    if (!this.selectedItem) return;
    this.selectedItem.classroomUsers = [];
    this.selectedItem.classroomUsers.push(...items);
  }
  
  loadClassroomUsers = async (params?: PaginationParams) => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return [];
      const items = await this.classroomUserResource.listEntities(id, params);
      runInAction(() => {
        this.setClassroomUsers(items);
      })
      return items;
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      runInAction(() => {
        this.setDetailsLoading(false);
      })
    }
  };

  get posts(): Post[] {
    return this.selectedItem?.posts ?? [];
  }

  setPosts(items: Post[]): void {
    if (!this.selectedItem) return;
    this.selectedItem.posts = [];
    this.selectedItem.posts.push(...items);
  }

  loadPosts = async (params?: PaginationParams) => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return [];
      const items = await this.postResource.listEntities(id, params);
      runInAction(() => {
        this.setPosts(items);
      })
      return items;
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      runInAction(() => {
        this.setDetailsLoading(false);
      })
    }
  };
}
