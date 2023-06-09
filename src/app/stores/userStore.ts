import { makeAutoObservable, runInAction } from "mobx";
import {
  ChangePasswordFormValues,
  LoginFormValues,
  RegisterFormValues,
  User,
} from "../models/User";
import agent from "../api/agent";
import { router } from "../router/Routes";
import { store } from "./store";
import RoleConstants from "../common/constants/RoleConstants";

export default class UserStore {
  user: User | null = null;
  isLoggingIn: boolean = false;
  isRegistering: boolean = false;
  isGettingUser: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  get isLecturer() {
    console.log(this.user);

    return this.user && this.user.roles
      ? this.user.roles.some((r) => r === RoleConstants.LECTURER)
      : false;
  }

  get isStudent() {
    console.log(this.user);
    return this.user && this.user.roles
      ? this.user?.roles.some((r) => r === RoleConstants.STUDENT)
      : false;
  }

  setLoggingIn(value: boolean) {
    this.isLoggingIn = value;
  }

  setRegistering(value: boolean) {
    this.isRegistering = value;
  }

  setGettingUser(value: boolean) {
    this.isGettingUser = value;
  }

  login = async (credentials: LoginFormValues): Promise<void> => {
    try {
      this.setLoggingIn(true);
      const user = await agent.Account.login(credentials);
      store.commonStore.setToken(user.token);
      runInAction(() => {
        this.user = user;
      });
      router.navigate("/classrooms");
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    } finally {
      runInAction(() => {
        this.setLoggingIn(false);
      });
    }
  };

  register = async (credentials: RegisterFormValues): Promise<void> => {
    try {
      this.setRegistering(true);
      const user = await agent.Account.register(credentials);
      store.commonStore.setToken(user.token);
      runInAction(() => {
        this.user = user;
      });
      router.navigate("/classrooms");
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    } finally {
      this.setRegistering(false);
    }
  };

  logout = (): void => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };

  getUser = async (): Promise<void> => {
    try {
      this.setGettingUser(true);
      const user = await agent.Account.current();
      runInAction(() => {
        this.user = user;
        console.log(this.user)
      });
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    } finally {
      runInAction(() => {
        this.setGettingUser(false);
      });
    }
  };

  changePassword = async (
    credentials: ChangePasswordFormValues
  ): Promise<boolean> => {
    try {
      await agent.Account.changePassword(credentials);
      return true;
    } catch (error) {
      console.error("Request error:", error);
      return false;
    }
  };
}
