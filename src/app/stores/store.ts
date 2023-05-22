import { createContext, useContext } from "react";
import ClassroomStore from "./classroomStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store {
    classroomStore: ClassroomStore,
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