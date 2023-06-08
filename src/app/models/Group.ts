import Entity, { Auditable } from "../common/models/Entity";
import Profile from "../common/models/Profile";
import { Classroom } from "./Classroom";

export interface Group extends Entity, Auditable {
    id: string;
    createDate: Date;
    name: string;
    description: string;
    leader?: Profile;
    classroom?: Classroom;

    groupUsers: Profile[];
}

export class Group implements Group {
    id = "";
    createDate = new Date();
    name = "";
    description = "";
    leader?: Profile = undefined;
    classroom?: Classroom = undefined;

    groupUsers: Profile[] = [];

    constructor(init?: GroupFormValues) {
        Object.assign(this, init);
    }
}

export class GroupFormValues {
    id?: string;
    name: string = "";
    description: string = "";
    leaderId?: string = "";
    classroomId?: string = "";

    constructor(group?: Group) {
        if (group) {
            const { leader, classroom, createDate, groupUsers, ...rest } = group;
            Object.assign(this, { ...rest });
        }
    }
}
