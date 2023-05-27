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

export default class UserStore {
  user: User | null = null;
	isLogginIn: boolean = false;
	isRegistering: boolean = false;
	isGettingUser: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

	setLogginIn(value: boolean) {
    this.isLogginIn = value;
  }

	setRegistering(value: boolean) {
    this.isRegistering = value;
  }

	setGettingUser(value: boolean) {
    this.isGettingUser = value;
  }

  login = async (creds: LoginFormValues) : Promise<void> => {
    try {
			this.setLogginIn(true)
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      router.navigate("/classrooms");
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    } finally {
			runInAction(() => {
				this.setLogginIn(false)
			})
		}
  };

  register = async (creds: RegisterFormValues) : Promise<void> => {
    try {
			this.setRegistering(true)
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      router.navigate("/classrooms");
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    } finally {
			this.setRegistering(false)
		}
  };

  logout = () : void => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };

  getUser = async () : Promise<void> => {
    try {
			this.setGettingUser(true)
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    } finally {
			runInAction(() => {
				this.setGettingUser(false)
			})
		}
  };

  changePassword = async (creds: ChangePasswordFormValues) : Promise<boolean> => {
    try {
      await agent.Account.changePassword(creds);
      return true;
    } catch (error) {
      console.error("Request error:", error);
      return false;
    }
  };
}
