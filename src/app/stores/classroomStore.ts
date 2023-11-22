import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { Classroom, ClassroomFormValues } from "../models/Classroom";
import { PaginationParams } from "../common/models/paginationPrams";
import { BaseHasManyRelationshipResource, BaseNonEntityHasManyRelationshipResource } from "../api/baseResource";
import Profile from "../common/models/Profile";
import agent from "../api/agent";
import UserRelatedStore from "../common/stores/userRelatedStore";
import { StudentResult } from "../models/StudentResult";
import { ClassroomScore } from "../models/ClassroomScore";

export default class ClassroomStore extends UserRelatedStore<
  Classroom,
  ClassroomFormValues
> {
  classroomUserResource: BaseHasManyRelationshipResource<Profile>;
  classroomResultResource: BaseNonEntityHasManyRelationshipResource<string, number, StudentResult>;
  classroomScoreResource: BaseNonEntityHasManyRelationshipResource<string, number, ClassroomScore>;
  constructor() {
    super("Classrooms");

    makeObservable(this, {
      loadClassroomUsers: action,
      classroomUsers: computed,
      setClassroomUsers: action,

      isStudentResultListLoading: observable,
      _studentResults: observable,
      studentResults: computed,
      loadClassroomStudentResults: action,
      setStudentResultListLoading: action,
      setStudentResults: action
    });

    this.classroomUserResource =
      agent.createHasManyRelationshipResource<Profile>("Classrooms", "Members");
      this.classroomResultResource =
      agent.createNonEntityHasManyRelationshipResource<string, number, StudentResult>("Classrooms", "Results");
      this.classroomScoreResource =
      agent.createNonEntityHasManyRelationshipResource<string, number, ClassroomScore>("Classrooms", "Scores");
  }

  isStudentResultListLoading: boolean = false

  get classroomUsers(): Profile[] {
    return this.selectedItem?.classroomUsers ?? [];
  }

  _studentResults: StudentResult[] = [];

  get studentResults(): StudentResult[] {
    return this._studentResults;
  }

  loadClassroomStudentResults = async (
    params?: PaginationParams
  ): Promise<StudentResult[]> => {
    try {
      this.setStudentResultListLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return [];
      const items = await this.classroomResultResource.listNonEntities(id, params);
      runInAction(() => {
        this.setStudentResults(items);
      });
      return items;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    } finally {
      runInAction(() => {
        this.setStudentResultListLoading(false);
      });
    }
  };

  setClassroomScoreListLoading(value: boolean) {
    this.isClassroomScoreListLoading  = value;
  }

  setClassroomScores(items: ClassroomScore[]): void {
    if (!this.selectedItem) return;
    this._classroomScores = [];
    this._classroomScores.push(...items);
  }

  isClassroomScoreListLoading: boolean = false;

  _classroomScores: ClassroomScore[] = [];

  get classroomScores(): ClassroomScore[] {
    return this._classroomScores;
  }

  loadClassroomClassroomScores = async (
    params?: PaginationParams
  ): Promise<ClassroomScore[]> => {
    try {
      this.setClassroomScoreListLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return [];
      const items = await this.classroomScoreResource.listNonEntities(id, params);
      runInAction(() => {
        this.setClassroomScores(items);
      });
      return items;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    } finally {
      runInAction(() => {
        this.setClassroomScoreListLoading(false);
      });
    }
  };

  setStudentResultListLoading(value: boolean) {
    this.isStudentResultListLoading  = value;
  }

  setStudentResults(items: StudentResult[]): void {
    if (!this.selectedItem) return;
    this._studentResults = [];
    this._studentResults.push(...items);
  }

  setClassroomUsers(items: Profile[]): void {
    if (!this.selectedItem) return;
    this.selectedItem.classroomUsers = [];
    this.selectedItem.classroomUsers.push(...items);
  }

  loadClassroomUsers = async (
    params?: PaginationParams
  ): Promise<Profile[]> => {
    try {
      this.setDetailsLoading(true);
      const id = this.selectedItem?.id;
      if (!id) return [];
      const items = await this.classroomUserResource.listEntities(id, params);
      runInAction(() => {
        this.setClassroomUsers(items);
      });
      return items;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    } finally {
      runInAction(() => {
        this.setDetailsLoading(false);
      });
    }
  };
}
