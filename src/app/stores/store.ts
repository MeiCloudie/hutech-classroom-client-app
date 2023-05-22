import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./users/userStore";
import ClassroomStore from "./classroomStore";

interface Store {
    classroomStore: ClassroomStore
    commonStore: CommonStore,
    userStore: UserStore
}

export const store: Store = {
    classroomStore: new ClassroomStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}