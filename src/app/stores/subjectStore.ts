import EntityStore from "../common/stores/entityStore";
import { Subject, SubjectFormValues } from "../models/Subject";

export default class SubjectStore extends EntityStore<Subject, SubjectFormValues> {
    constructor() {
        super("Subjects")
    }
}