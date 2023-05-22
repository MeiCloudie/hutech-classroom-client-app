import { makeAutoObservable } from "mobx";
import { Classroom } from "../../models/Classroom";
import agent from "../../api/agent";

const handleRequestError = (error: any) => {
  console.error("Request error:", error);
};
export default class ClassroomStore {
  selectedClassroom: Classroom | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  getClassroom = async (id: string) => {
    try {
      const classroom = await agent.Classrooms.details(id);
      this.selectedClassroom = classroom;
    } catch (error) {
      handleRequestError(error);
    }
  };
}
