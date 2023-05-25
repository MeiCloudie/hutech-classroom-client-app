import { computed, makeObservable } from "mobx";
import agent from "../api/agent";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import EntityStore from "../common/stores/entityStore";
import { Comment } from "../models/Comment";
import { Post, PostFormValues } from "../models/Post";
import { PaginationParams } from "../common/models/paginationPrams";
import { handleRequestError } from "../api/apiUtils";

export default class PostStore extends EntityStore<Post, PostFormValues> {
    postCommentResource: BaseHasManyRelationshipResource<Comment>
    constructor() {
        super("Posts")

        makeObservable(this, {
            comments: computed
        })

        this.postCommentResource = agent.createHasManyRelationshipResource<Comment>("Posts", "Comments");
    }

    get comments(): Comment[] {
        return this.selectedItem?.comments ?? [];
    } 

    setComments(items: Comment[]): void {
        if (!this.selectedItem)
            return;
        this.selectedItem.comments = []
        this.selectedItem.comments.push(...items)
    }

    loadComments= async (params?: PaginationParams) => {
        try {
            const id = this.selectedItem?.id;
            if (!id) return;
            const items = await this.postCommentResource.listEntities(id, params);
            this.setComments(items);
        } catch (error) {
            handleRequestError(error);
        }
    }
}