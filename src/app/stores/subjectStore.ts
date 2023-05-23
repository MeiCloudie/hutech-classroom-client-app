import BaseStore from "../common/stores/baseStore";
import { Subject, SubjectFormValues } from "../models/Subject";

export default class SubjectStore extends BaseStore<Subject, SubjectFormValues> {
    constructor() {
        super("Subjects")
    }
}