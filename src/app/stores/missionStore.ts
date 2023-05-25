import UserRelatedStore from "../common/stores/userRelatedStore";
import { Mission, MissionFormValues } from "../models/Mission";

export default class MissionStore extends UserRelatedStore<Mission, MissionFormValues> {
    constructor() {
        super("Missions")
    }
}