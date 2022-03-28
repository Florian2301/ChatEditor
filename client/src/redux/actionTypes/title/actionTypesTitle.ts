import { AllTitles, Title, UserTitles } from '../../interfaces/interfaces'

export enum ActionType {
    PUBLISH = 'PUBLISH',
    GET_TITLE = 'GET_TITLE',
    GET_ALL_TITLES = 'GET_ALL_TITLES',
    GET_USER_TITLES = 'GET_USER_TITLES',
    DELETE_TITLE = 'DELETE_TITLE',
    CLEAR_DISPLAY = 'CLEAR_DISPLAY'
}

interface Publish {
    type: ActionType.PUBLISH
    payload: boolean
}

interface GetTitle {
    type: ActionType.GET_TITLE
    payload: Title
}

interface GetAllTitles {
    type: ActionType.GET_ALL_TITLES
    payload: AllTitles
}

interface GetUserTitles {
    type: ActionType.GET_USER_TITLES
    payload: UserTitles
}

interface DeleteTitle {
    type: ActionType.DELETE_TITLE
    payload: string
}

interface ClearDisplay {
    type: ActionType.CLEAR_DISPLAY
}

export type Action = Publish | GetTitle | GetAllTitles | GetUserTitles | DeleteTitle | ClearDisplay