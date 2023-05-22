import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ClassroomStore from "./classrooms/classroomStore";
import ClassroomsStore from "./classrooms/classroomsStore";
import UserStore from "./users/userStore";

interface Store {
    classroomsStore: ClassroomsStore,
    classroomStore: ClassroomStore
    commonStore: CommonStore,
    userStore: UserStore
}

export const store: Store = {
    classroomsStore: new ClassroomsStore(),
    classroomStore: new ClassroomStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}