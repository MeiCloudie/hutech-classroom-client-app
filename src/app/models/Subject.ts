import Entity, { Auditable } from "../common/models/Entity";
import { Major } from "./Major";

export interface Subject extends Entity, Auditable {
  code: string;
  title: string;
  totalCredits: number;

  major?: Major;
}

export class Subject implements Subject {
  id: string = "";
  createDate: Date = new Date();
  code: string = "";
  title: string = "";
  totalCredits: number = 0;

  major?: Major = undefined;

  constructor(init?: SubjectFormValues) {
    Object.assign(this, init);
  }
}

export class SubjectFormValues {
  id?: string = "";
  createDate: Date = new Date();
  code: string = "";
  title: string = "";
  totalCredits: number = 0;
  
  majorId?: string = undefined;

  constructor(subject?: Subject) {
    if (subject) {
      const { major, ...rest } = subject
      Object.assign(this, rest)
    }
  }
}
