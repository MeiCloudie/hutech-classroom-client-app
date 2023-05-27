import { computed, makeObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import EntityStore from "../common/stores/entityStore";
import { Comment } from "../models/Comment";
import { Post, PostFormValues } from "../models/Post";
import { PaginationParams } from "../common/models/paginationPrams";

export default class PostStore extends EntityStore<Post, PostFormValues> {
  postCommentResource: BaseHasManyRelationshipResource<Comment>;
  classroomPostResource: BaseHasManyRelationshipResource<Post>;
  constructor() {
    super("Posts");

    makeObservable(this, {
      comments: computed,
    });

    this.postCommentResource = agent.createHasManyRelationshipResource<Comment>(
      "Posts",
      "Comments"
    );
    this.classroomPostResource = agent.createHasManyRelationshipResource<Post>(
      "Classrooms",
      "Posts"
    )
  }

  loadClassroomPosts = async (classroomId: string, params?: PaginationParams) => {
    try {
      this.setListLoading(true);
      const items = await this.classroomPostResource.listEntities(classroomId, params);
      runInAction(() => {
        this.setItems(items);
      })
      return items;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    } finally {
      runInAction(() => {
        this.setListLoading(false);
      })
    }
  };

  get comments(): Comment[] {
    return this.selectedItem?.comments ?? [];
  }

  setComments(items: Comment[]): void {
    if (!this.selectedItem) return;
    this.selectedItem.comments = [];
    this.selectedItem.comments.push(...items);
  }

  loadComments = async (params?: PaginationParams, shouldRefresh: boolean = false) => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return;
      const items = await this.postCommentResource.listEntities(id, params);
      this.setComments(items);
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      this.setDetailsLoading(false);
    }
  };
}
