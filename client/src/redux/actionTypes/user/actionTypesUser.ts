import { AllUser, User } from '../../interfaces/interfaces'

export enum ActionType {
    CLEAR_DISPLAY = 'CLEAR_DISPLAY',
    WELCOME = 'WELCOME',
    CANCEL = 'CANCEL',
    LOGOUT = 'LOGOUT',
    SET_KEY_L = 'SET_KEY_L',
    SET_KEY_R = 'SET_KEY_R',
    CHANGE_MODUS = 'CHANGE_MODUS',
    SELECT_LANGUAGE = 'SELECT_LANGUAGE',
    WRITE_COMMENT = 'WRITE_COMMENT',
    ADD_USER = 'ADD_USER',
    GET_USER = 'GET_USER',
    GET_ALL_USERS = 'GET_ALL_USERS',
    UPDATE_USER = 'UPDATE_USER',
    DELETE_USER = 'DELETE_USER'
}

interface Clear {
    type: ActionType.CLEAR_DISPLAY
}

interface Welcome {
    type: ActionType.WELCOME
}

interface Cancel {
    type: ActionType.CANCEL
}

interface Logout {
    type: ActionType.LOGOUT
}

interface SetKeyL {
    type: ActionType.SET_KEY_L,
    payload: string
}

interface SetKeyR {
    type: ActionType.SET_KEY_R,
    payload: string
}

interface ChangeModus {
    type: ActionType.CHANGE_MODUS,
    payload: string
}

interface SelectLanguage {
    type: ActionType.SELECT_LANGUAGE,
    payload: string
}

interface WriteComment {
    type: ActionType.WRITE_COMMENT,
    payload: boolean
}

interface AddUser {
    type: ActionType.ADD_USER,
    username: string,
    email: string
}

interface GetUser {
    type: ActionType.GET_USER,
    payload: User
}

interface GetAllUsers {
    type: ActionType.GET_ALL_USERS,
    payload: AllUser
}

interface UpdateUser {
    type: ActionType.UPDATE_USER
}

interface DeleteUser {
    type: ActionType.DELETE_USER
}


export type Action = Clear | Welcome | Cancel | Logout | SetKeyL| SetKeyR | ChangeModus | SelectLanguage | WriteComment | AddUser | GetUser | GetAllUsers | DeleteUser | UpdateUser