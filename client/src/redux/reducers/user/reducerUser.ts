import { Action, ActionType } from '../../actionTypes/user/actionTypesUser.js'
import { AllUser } from '../../interfaces/interfaces.js'

interface InitialState {
  userId: string,
  username: string,
  email: string,
  date: string,
  allUsers: AllUser[],
  admin: boolean,
  loggedIn: boolean,
  welcome: boolean,
  signUp: boolean,
  update: boolean,
  delete: boolean,
  modus: string,
  keyL: string,
  keyR: string,
  language: string,
  selectLanguage: string[],
  writeComment: boolean
}

let initialState: InitialState = {
  userId: '',
  username: '',
  email: '',
  date: '',
  allUsers: [],
  admin: false,
  loggedIn: false,
  welcome: false,
  signUp: false,
  update: false,
  delete: false,
  modus: 'auto',
  keyL: 'userchats',
  keyR: 'about',
  language: 'deutsch',
  selectLanguage: ['deutsch', 'english'],
  writeComment: false,
}

function users(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.ADD_USER:
      return {
        ...state,
        username: action.username,
        email: action.email,
        signUp: true,
      }
    case ActionType.GET_USER:
      return {
        ...state,
        userId: action.payload._id,
        username: action.payload.username,
        email: action.payload.email,
        admin: action.payload.admin,
        date: action.payload.date,
        allUsers: action.payload,
        loggedIn: true,
        signUp: false,
        writeComment: false,
      }
    case ActionType.GET_ALL_USERS:
      return { ...state, allUsers: action.payload }
    case ActionType.WELCOME:
      return { ...state, welcome: true }
    case ActionType.UPDATE_USER:
      return { ...state, update: true, welcome: false }
    case ActionType.CHANGE_MODUS:
      return { ...state, modus: action.payload }
    case ActionType.SELECT_LANGUAGE:
      return { ...state, language: action.payload }
    case ActionType.WRITE_COMMENT:
      return { ...state, writeComment: action.payload }
    case ActionType.CLEAR_DISPLAY:
      return { ...state, writeComment: false }
    case ActionType.CANCEL:
      return { ...state, update: false, welcome: false }
    case ActionType.LOGOUT:
      return {
        ...state,
        userId: [],
        username: [],
        email: [],
        date: [],
        allUsers: [],
        admin: false,
        loggedIn: false,
        welcome: false,
        signUp: false,
        update: false,
        delete: false,
        keyL: 'userchats',
        keyR: 'about',
      }
    case ActionType.SET_KEY_L:
      return { ...state, keyL: action.payload }
    case ActionType.SET_KEY_R:
      return { ...state, keyR: action.payload }
    case ActionType.DELETE_USER:
      return { ...initialState, delete: true }
    default:
      return state
  }
}

export default users
