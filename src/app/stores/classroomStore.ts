import { makeAutoObservable } from "mobx";

export default class ClassroomStore {
    constructor() {
        makeAutoObservable(this)
    }
}