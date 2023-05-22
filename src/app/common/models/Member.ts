import { Faculty } from "../../models/Faculty";

export default interface Member {
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    faculty?: Faculty
}