import Entity, { Auditable } from "../common/models/Entity";
import Profile from "../common/models/Profile";
import { Project } from "./Project";

export interface Mission extends Entity, Auditable {
    id: string;
    createDate: Date;
    title: string;
    description: string;
    isDone: boolean;
    project?: Project;

    missionUsers: Profile[];
}

export class Mission implements Mission {
    id = "";
    createDate = new Date();
    title = "";
    description = "";
    isDone = false;
    project?: Project = undefined;

    missionUsers: Profile[] = [];

    constructor(init?: MissionFormValues) {
        Object.assign(this, init);
    }
}

export class MissionFormValues {
    id?: string = "";
    title: string = "";
    description: string = "";
    isDone: boolean = false;
    projectId?: string = "";

    constructor(mission?: Mission) {
        if (mission) {
            const { project, createDate, missionUsers, ...rest } = mission;
            Object.assign(this, { ...rest });
        }
    }
}
