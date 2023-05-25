import Entity, { Auditable, EntityFormValues } from "../common/models/Entity";

export interface Major extends Entity, Auditable {
  code: string;
  title: string;
  totalCredits: number;
  nonCumulativeCredits: number;
}

export class Major implements Major {
  id: string = "";
  createDate: Date = new Date();
  code: string = "";
  title: string = "";
  totalCredits: number = 0;
  nonCumulativeCredits: number = 0;

  constructor(init?: MajorFormValues) {
    Object.assign(this, init);
  }
}

export class MajorFormValues implements EntityFormValues {
  id?: string = "";
  code: string = "";
  title: string = "";
  totalCredits: number = 0;
  nonCumulativeCredits: number = 0;

  constructor(major?: Major) {
    if (major) {
      const { createDate, ...rest } = major;
      Object.assign(this, rest);
    }
  }
}
