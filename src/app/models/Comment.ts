import Entity, { Auditable } from "../common/models/Entity";
import Profile from "../common/models/Profile";
import { Post } from "./Post";

export interface Comment extends Entity, Auditable {
    id: string;
    createDate: Date;
    content: string;

    user?: Profile;
    post?: Post;
}

export class Comment implements Comment {
    id = "";
    createDate = new Date();
    content = "";
    user?: Profile = undefined;
    post?: Post = undefined;

    constructor(init?: CommentFormValues) {
        Object.assign(this, init);
    }
}

export class CommentFormValues {
    id?: string = "";
    content: string = "";
    userName?: string = "";
    postId?: string = "";

    constructor(comment?: Comment) {
        if (comment) {
            const { user, post, createDate, ...rest } = comment;
            Object.assign(this, { ...rest });
        }
    }
}
