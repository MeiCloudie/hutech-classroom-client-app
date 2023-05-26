import { makeAutoObservable, runInAction } from "mobx"
import { ChangePasswordFormValues, LoginFormValues, RegisterFormValues, User } from "../models/User"
import agent from "../api/agent"
import { router } from "../router/Routes"
import { handleRequestError } from "../api/apiUtils"
import { store } from "./store"

export default class UserStore {
    user: User | null = null

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user
    }

    login = async (creds: LoginFormValues) => {
        try {
            const user = await agent.Account.login(creds)
            store.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            router.navigate('/classrooms')
        } catch (error) {
            handleRequestError(error)
            throw error;
        }
    }

    register = async (creds: RegisterFormValues) => {
        try {
            const user = await agent.Account.register(creds)
            store.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            router.navigate('/classrooms')
        } catch (error) {
            handleRequestError(error)
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null)
        this.user = null
        router.navigate('/')
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current()
            runInAction(() => this.user = user)
        } catch (error) {
            handleRequestError(error)
            throw error;
        }
    }

    changePassword = async (creds: ChangePasswordFormValues) => {
        try {
            await agent.Account.changePassword(creds)
            return true;
        } catch (error) {
            handleRequestError(error)
            return false;
        }
    }
}