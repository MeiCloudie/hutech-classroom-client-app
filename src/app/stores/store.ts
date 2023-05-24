import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./users/userStore";
import ClassroomStore from "./classroomStore";
import FacultyStore from "./facultyStore";
import SubjectStore from "./subjectStore";
import PostStore from "./postStore";

interface Store {
    classroomStore: ClassroomStore,
    commonStore: CommonStore,
    facultyStore: FacultyStore,
    postStore: PostStore
    subjectStore: SubjectStore,
    userStore: UserStore
}

export const store: Store = {
    classroomStore: new ClassroomStore(),
    commonStore: new CommonStore(),
    facultyStore: new FacultyStore(),
    postStore: new PostStore(),
    subjectStore: new SubjectStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}