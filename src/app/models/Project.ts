import Entity, { Auditable } from "../common/models/Entity";
import { Group } from "./Group";

export interface Project extends Entity, Auditable {
    id: string;
    createDate: Date;
    name: string;
    description: string;
    group?: Group;
}

export class Project implements Project {
    id = "";
    createDate = new Date();
    name = "";
    description = "";
    group?: Group = undefined;

    constructor(init?: ProjectFormValues) {
        Object.assign(this, init);
    }
}

export class ProjectFormValues {
    id?: string;
    name: string = "";
    description: string = "";
    groupId?: string;

    constructor(project?: Project) {
        if (project) {
            const { group, createDate, ...rest } = project;
            Object.assign(this, { ...rest });
        }
    }
}
