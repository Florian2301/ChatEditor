import { Chat, UserChats } from '../../interfaces/interfaces'

export enum ActionType {
    GET_CHAT = 'GET_CHAT',
    GET_USER_CHATS = 'GET_USER_CHATS',
    DELETE_CHAT = 'DELETE_CHAT',
    CLEAR_DISPLAY = 'CLEAR_DISPLAY'
}

interface GetChat {
    type: ActionType.GET_CHAT
    payload: Chat
}

interface GetUserChats {
    type: ActionType.GET_USER_CHATS
    payload: UserChats[]
    userId: string
}

interface DeleteChat {
    type: ActionType.DELETE_CHAT
    payload: string
}

interface ClearDisplay {
    type: ActionType.CLEAR_DISPLAY
}

export type Action = GetChat | GetUserChats | DeleteChat | ClearDisplay