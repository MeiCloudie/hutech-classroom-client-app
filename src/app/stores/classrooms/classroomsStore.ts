import { makeAutoObservable } from "mobx";
import { Classroom, ClassroomFormValues } from "../../models/Classroom";
import agent from "../../api/agent";

const handleRequestError = (error: any) => {
    console.error("Request error:", error);
  };
export default class ClassroomStore {
    classrooms: Classroom[] = [];
    selectedClassroom: Classroom | undefined = undefined;
  
    constructor() {
      makeAutoObservable(this);
    }
  
    private _loadClassrooms = async () => {
        try {
            const classrooms = await agent.Classrooms.list();
            this.classrooms = classrooms;
        } catch (error) {
            handleRequestError(error);
        }
    };
  
    getClassroom = async (id: string) => {
      try {
        const classroom = await agent.Classrooms.details(id);
        this.selectedClassroom = classroom;
      } catch (error) {
        handleRequestError(error);
      }
    };
  
    createClassroom = async (classroomFormValues: ClassroomFormValues) => {
      try {
        const classroom = await agent.Classrooms.create(classroomFormValues);
        this.classrooms.push(classroom);
      } catch (error) {
        handleRequestError(error);
      }
    };
  
    updateClassroom = async (id: string, classroomFormValues: ClassroomFormValues) => {
      try {
        await agent.Classrooms.update(id, classroomFormValues);
        const index = this.classrooms.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.classrooms[index] = { ...this.classrooms[index], ...classroomFormValues };
        }
      } catch (error) {
        handleRequestError(error);
      }
    };
  
    deleteClassroom = async (id: string) => {
      try {
        await agent.Classrooms.delete(id);
        this.classrooms = this.classrooms.filter((c) => c.id !== id);
      } catch (error) {
        handleRequestError(error);
      }
    };
  }
  