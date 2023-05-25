import EntityStore from "../common/stores/entityStore";
import { Comment, CommentFormValues } from "../models/Comment";

export default class CommentStore extends EntityStore<Comment, CommentFormValues> {
    constructor() {
        super("Comments")
    }
}