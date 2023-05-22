import { Faculty } from "../../models/Faculty";

export default interface Profile {
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    faculty?: Faculty
}