import Entity, { Auditable, EntityFormValues } from "../common/models/Entity";

export interface Faculty extends Entity, Auditable {
  name: string;
}

export class Faculty implements Faculty {
  id: string = "";
  createDate: Date = new Date();
  name: string = "";

  constructor(init?: FacultyFormValues) {
    Object.assign(this, init);
  }
}

export class FacultyFormValues implements EntityFormValues {
  id?: string = "";
  name: string = "";

  constructor(faculty?: Faculty) {
    if (faculty) {
      const { createDate, ...rest } = faculty;
      Object.assign(this, rest);
    }
  }
}
