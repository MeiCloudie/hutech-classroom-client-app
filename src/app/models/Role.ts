import Entity from "../common/models/Entity";

export interface Role extends Entity {
    id: string;
    name: string;
}

export class Role implements Role {
    id = "";
    name = "";

    constructor(init?: RoleFormValues) {
        Object.assign(this, init);
    }
}

export class RoleFormValues {
    id?: string = "";
    name: string = "";

    constructor(role?: Role) {
        if (role) {
            const { ...rest } = role;
            Object.assign(this, { ...rest });
        }
    }
}
