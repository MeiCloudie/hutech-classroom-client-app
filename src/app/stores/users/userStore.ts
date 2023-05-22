import { makeAutoObservable, runInAction } from "mobx"
import { ChangePasswordFormValues, LoginFormValues, RegisterFormValues, User } from "../../models/User"
import agent from "../../api/agent"
import { store } from "../store"
import { router } from "../../router/Routes"
import { handleRequestError } from "../../api/apiUtils"

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
            router.navigate('/home')
        } catch (error) {
            handleRequestError(error)
        }
    }

    register = async (creds: RegisterFormValues) => {
        try {
            const user = await agent.Account.register(creds)
            store.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            router.navigate('/home')
        } catch (error) {
            handleRequestError(error)
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