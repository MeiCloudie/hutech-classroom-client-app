import { Faculty } from "../../models/Faculty";
import Entity from "./Entity";

export default interface Profile extends Entity {
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    faculty?: Faculty
    isSubmitted?: boolean
}