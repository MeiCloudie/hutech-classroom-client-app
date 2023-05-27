import { makeAutoObservable, reaction } from "mobx"

export default class CommonStore {
    token: string | null | undefined = localStorage.getItem('jwt')
    appLoaded = false

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('jwt', token)
                } else {
                    localStorage.removeItem('jwt')
                }
            }
        )
    }

    setToken = (token: string | null | undefined) : void => {
        if (token) localStorage.setItem('jwt', token)
        this.token = token
    }

    setAppLoaded = () : void => {
        this.appLoaded = true
    }
}