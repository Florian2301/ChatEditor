import { Action, ActionType } from '../../actionTypes/title/actionTypesTitle'
import { AllTitles, UserTitles } from '../../interfaces/interfaces'

interface InitialState {
  titleId: string,
  userId: string,
  admin: boolean,
  chatId: string,
  chatnumber: number | string,
  title: string,
  author: string,
  date: string,
  language: string,
  tags: string[],
  description: string,
  userTitles: UserTitles[],
  allTitles: AllTitles[],
  publish: boolean | number,
}

let initialState: InitialState = {
  titleId: '',
  userId: '',
  admin: false,
  chatId: '',
  chatnumber: '',
  title: '',
  author: '',
  date: '',
  language: '',
  tags: [],
  description: '',
  userTitles: [],
  allTitles: [],
  publish: false,
}

const title = (state: InitialState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.GET_ALL_TITLES:
      return { ...state, allTitles: action.payload }
    case ActionType.GET_USER_TITLES:
      return { ...state, userTitles: action.payload }
    case ActionType.GET_TITLE:
      return {
        ...state,
        titleId: action.payload._id,
        userId: action.payload.userId,
        user: action.payload.user,
        chatId: action.payload.chatId,
        chatnumber: action.payload.chatnumber,
        title: action.payload.title,
        author: action.payload.author,
        date: action.payload.date,
        language: action.payload.language,
        tags: action.payload.tags,
        description: action.payload.description,
        admin: action.payload.admin,
      }
    case ActionType.DELETE_TITLE:
      return {
        ...state,
        allTitles: state.allTitles.filter((title: any) => title._id !== action.payload),
      }
    case ActionType.CLEAR_DISPLAY:
      return {
        ...state,
        titleId: '',
        userId: '',
        admin: false,
        chatId: '',
        chatnumber: '',
        title: '',
        author: '',
        date: '',
        language: '',
        tags: '',
        description: '',
        publish: false,
      }
    case ActionType.PUBLISH:
      return { ...state, publish: action.payload }
    default:
      return state
  }
}

export default title
