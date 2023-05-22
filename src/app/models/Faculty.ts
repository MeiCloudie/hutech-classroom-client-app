import Entity, { EntityFormValues } from "../common/models/Entity";

export interface Faculty extends Entity {
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
  createDate: Date = new Date();
  name: string = "";

  constructor(faculty?: Faculty) {
    if (faculty) {
      this.id = faculty.id;
      this.createDate = faculty.createDate;
      this.name = faculty.name;
    }
  }
}
