import { action, computed, makeObservable } from "mobx";
import { Classroom, ClassroomFormValues } from "../models/Classroom";
import { PaginationParams } from "../common/models/paginationPrams";
import { BaseHasManyRelationshipResource } from "../api/baseResource";
import Profile from "../common/models/Profile";
import agent from "../api/agent";
import { handleRequestError } from "../api/apiUtils";
import UserRelatedStore from "../common/stores/userRelatedStore";

export default class ClassroomStore extends UserRelatedStore<Classroom, ClassroomFormValues> {
    hasManyRelationshipResource: BaseHasManyRelationshipResource<Profile>
    constructor() {
        super("Classrooms")

        makeObservable(this, {
            classroomUsers: computed,
            setClassroomUsers: action
        })

        this.hasManyRelationshipResource = agent.createHasManyRelationshipResource<Profile>("Classrooms", "Members")
    }

    get classroomUsers(): Profile[] {
        return this.selectedItem?.classroomUsers ?? [];
    } 

    setClassroomUsers(items: Profile[]): void {
        if (!this.selectedItem)
            return;
        this.selectedItem.classroomUsers = []
        this.selectedItem?.classroomUsers.push(...items)
    }

    loadClassroomUsers = async (params?: PaginationParams) => {
        try {
            const id = this.selectedItem?.id;
            if (!id) return;
            const items = await this.hasManyRelationshipResource.listEntities(id, params);
            this.setClassroomUsers(items);
        } catch (error) {
            handleRequestError(error);
        }
    }
}