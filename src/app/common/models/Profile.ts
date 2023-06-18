import { Faculty } from "../../models/Faculty";
import { Group } from "../../models/Group";
import Entity from "./Entity";

export default interface Profile extends Entity {
    id: string,
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    faculty?: Faculty
    isSubmitted?: boolean,
    groups: Group[]
}