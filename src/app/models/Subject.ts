import Entity from "../common/models/Entity";

export interface Subject extends Entity {
    code: string;
    title: string;
    totalCredits: number;

    major: Major;
}
