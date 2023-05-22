import { makeAutoObservable, runInAction } from "mobx"
import { LoginFormValues, RegisterFormValues, User } from "../models/User"
import { store } from "./store"
import { router } from "../router/Routes"
import agent from "../api/agent"

export default class UserStore {
    user: User | null = null
    fbLoading = false

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
            throw error
        }
    }

    register = async (creds: RegisterFormValues) => {
        try {
            const user = await agent.Account.register(creds)
            store.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            router.navigate('/home')
        } catch (error) {
            throw error
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
            console.log(this.user)
        }
    }
}