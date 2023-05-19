import Entity from "../common/models/Entity";

export interface Major extends Entity {
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

export class MajorFormValues {
  id?: string = "";
  createDate: Date = new Date();
  code: string = "";
  title: string = "";
  totalCredits: number = 0;
  nonCumulativeCredits: number = 0;

  constructor(major?: Major) {
    if (major) {
      this.id = major.id;
      this.createDate = major.createDate;
      this.code = major.code;
      this.title = major.title;
      this.totalCredits = major.totalCredits;
      this.nonCumulativeCredits = major.nonCumulativeCredits;
    }
  }
}
