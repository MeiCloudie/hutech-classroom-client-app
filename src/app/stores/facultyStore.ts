import EntityStore from "../common/stores/entityStore";
import { Faculty, FacultyFormValues } from "../models/Faculty";

export default class FacultyStore extends EntityStore<Faculty, FacultyFormValues> {
    constructor() {
        super("Faculties")
    }
}