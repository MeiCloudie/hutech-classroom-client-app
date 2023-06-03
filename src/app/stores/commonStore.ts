import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/ServerError";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null | undefined = localStorage.getItem("jwt");
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem("jwt", token);
        } else {
          localStorage.removeItem("jwt");
        }
      }
    );
  }

  setServerError(error: ServerError) {
    this.error = error;
  }

  setToken = (token: string | null | undefined): void => {
    if (token) localStorage.setItem("jwt", token);
    this.token = token;
  };

  setAppLoaded = (): void => {
    this.appLoaded = true;
  };
}
