import BaseStore from "../common/stores/baseStore";
import { Faculty, FacultyFormValues } from "../models/Faculty";

export default class FacultyStore extends BaseStore<Faculty, FacultyFormValues> {
    constructor() {
        super("Faculties")
    }
}