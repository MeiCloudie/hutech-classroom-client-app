import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Comment, CommentFormValues } from "../models/Comment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { PaginationParams } from "../common/models/paginationPrams";

export default class CommentStore {
    comments: Comment[] = []
    hubConnection: HubConnection | null = null
    constructor() {
        makeAutoObservable(this)
    }

    createHubConnection = (postId: string, params?: PaginationParams) : void => {
        if (store.postStore.selectedItem) {
            let pagingString = "";
            if (params) {
                pagingString = `&pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`
            }
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${process.env.REACT_APP_HUTECH_CLASSROOM_HUBS}comments?postId=${postId}` + pagingString, {
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

    stopHubConnection = () : void => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error))
    }

    clearComments = () : void => {
        this.comments = []
        this.stopHubConnection()
    }

    addComment = async (values: CommentFormValues) : Promise<void> => {
        values.postId = store.postStore.selectedItem?.id
        try {
            await this.hubConnection?.invoke('SendComment', values)
        } catch (error) {
            console.log(error)
        }
    }
}