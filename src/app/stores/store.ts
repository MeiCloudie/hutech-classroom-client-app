import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ClassroomStore from "./classroomStore";
import FacultyStore from "./facultyStore";
import SubjectStore from "./subjectStore";
import PostStore from "./postStore";
import CommentStore from "./commentStore";
import ExerciseStore from "./exerciseStore";
import MissionStore from "./missionStore";
import GroupStore from "./groupStore";

interface Store {
  classroomStore: ClassroomStore;
  commentStore: CommentStore;
  commonStore: CommonStore;
  exerciseStore: ExerciseStore;
  facultyStore: FacultyStore;
  groupStore: GroupStore;
  missionStore: MissionStore;
  postStore: PostStore;
  subjectStore: SubjectStore;
  userStore: UserStore;
}

export const store: Store = {
  classroomStore: new ClassroomStore(),
  commentStore: new CommentStore(),
  commonStore: new CommonStore(),
  exerciseStore: new ExerciseStore(),
  facultyStore: new FacultyStore(),
  groupStore: new GroupStore(),
  missionStore: new MissionStore(),
  postStore: new PostStore(),
  subjectStore: new SubjectStore(),
  userStore: new UserStore(),
};

export const StoreContext = createContext(store);

export function useStore() : Store {
  return useContext(StoreContext);
}
