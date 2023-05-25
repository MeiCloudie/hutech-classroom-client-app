import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Comment, CommentFormValues } from "../models/Comment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

export default class CommentStore {
    comments: Comment[] = []
    hubConnection: HubConnection | null = null
    constructor() {
        makeAutoObservable(this)
    }

    createHubConnection = (postId: string) => {
        if (store.postStore.selectedItem) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`https://hutechclassroom.azurewebsites.net/hubs/comments?postId=${postId}`, {
                    skipNegotiation: true,
                    transport: HttpTransportType.WebSockets,
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build()

            this.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error))

            this.hubConnection.on('LoadComments', (comments: Comment[], pagination: { pageIndex: number, pageSize: number, count: number, totalCount: number, totalPages: number, hasPreviousPage: boolean, hasNextPage: boolean }) => {
                runInAction(() => {
                    if (comments != null) {
                        comments.forEach(comment => {
                            comment.createDate = new Date(comment.createDate + 'Z')
                        })
                        this.comments = comments
                    }
                })
            })

            this.hubConnection.on('ReceiveComment', (comment: Comment) => {
                runInAction(() => {
                    console.log(comment.createDate)
                    comment.createDate = new Date(comment.createDate)
                    this.comments.unshift(comment)
                })
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error))
    }

    clearComments = () => {
        this.comments = []
        this.stopHubConnection()
    }

    addComment = async (values: CommentFormValues) => {
        values.postId = store.postStore.selectedItem?.id
        try {
            await this.hubConnection?.invoke('SendComment', values)
        } catch (error) {
            console.log(error)
        }
    }
}