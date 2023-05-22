import { createContext, useContext } from "react";
import ClassroomStore from "./classroomStore";

interface Store {
    classroomStore: ClassroomStore
}

export const store: Store = {
    classroomStore: new ClassroomStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}