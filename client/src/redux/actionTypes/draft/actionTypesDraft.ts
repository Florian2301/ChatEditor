import { Draft, UserDrafts } from '../../interfaces/interfaces.js'

export enum ActionType {
    ADD_PHIL = 'ADD_PHIL',
    SELECT_COLOR = 'SELECT_COLOR',
    ADD_COLOR = 'ADD_COLOR',
    WRITE_MESSAGE = 'WRITE_MESSAGE',
    GET_DRAFT = 'GET_DRAFT',
    GET_USER_DRAFTS = 'GET_USER_DRAFTS',
    DELETE_DRAFT = 'DELETE_DRAFT',
    CLEAR_DISPLAY = 'CLEAR_DISPLAY'
}

interface AddPhil {
    type: ActionType.ADD_PHIL
    payload: string
}

interface SelectColor {
    type: ActionType.SELECT_COLOR
    payload: string
}

interface AddColor {
    type: ActionType.ADD_COLOR
    payload: string
}

interface WriteMesage {
    type: ActionType.WRITE_MESSAGE
    payload: boolean
}

interface GetDraft {
    type: ActionType.GET_DRAFT
    payload: Draft
}

interface GetUserDrafts {
    type: ActionType.GET_USER_DRAFTS
    payload: UserDrafts[]
    userId: string
}

interface DeleteDraft {
    type: ActionType.DELETE_DRAFT
    payload: string
}

interface ClearDisplay {
    type: ActionType.CLEAR_DISPLAY
}

export type Action = AddPhil | SelectColor | AddColor | WriteMesage | GetDraft | GetUserDrafts | DeleteDraft | ClearDisplay