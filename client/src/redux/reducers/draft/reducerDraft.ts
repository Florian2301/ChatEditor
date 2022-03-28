import { Action, ActionType } from '../../actionTypes/draft/actionTypesDraft'
import { Messages, Philosopher, UserDrafts } from '../../interfaces/interfaces'

interface InitialState {
  draftId: string, 
  userId: string,
  user: string;
  admin: boolean,
  title: string,
  author: string,
  published: boolean,
  date: string,
  language: string,
  tags: string[],
  description: string,
  philosopher: Philosopher[],
  colors: string[],
  messages: Messages[],
  userDrafts: UserDrafts[],
  draftEditmode: boolean,
  write: boolean
}

let initialState: InitialState = {
  draftId: '',
  userId: '',
  user: '',
  admin: false,
  title: '',
  author: '',
  published: false,
  date: '',
  language: '',
  tags: [],
  description: '',
  philosopher: [],
  colors: ['blue', 'pink', 'orangered', 'brown', 'darkorange', 'green'],
  messages: [],
  userDrafts: [],
  draftEditmode: false,
  write: false,
}

const drafts = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_PHIL:
      return { ...state, philosopher: action.payload }
    case ActionType.SELECT_COLOR:
      return {
        ...state,
        colors: state.colors.filter((color) => color !== action.payload),
      }
    case ActionType.ADD_COLOR:
      return {
        ...state,
        colors: action.payload,
      }
    case ActionType.WRITE_MESSAGE:
      return { ...state, write: action.payload }
    case ActionType.GET_DRAFT:
      return {
        ...state,
        draftId: action.payload._id,
        userId: action.payload.userId,
        user: action.payload.user,
        admin: action.payload.admin,
        title: action.payload.title,
        author: action.payload.author,
        published: action.payload.published,
        date: action.payload.date,
        language: action.payload.language,
        tags: action.payload.tags,
        description: action.payload.description,
        philosopher: action.payload.philosopher,
        messages: action.payload.messages,
        draftEditmode: true,
      }
    case ActionType.GET_USER_DRAFTS:
      let drafts: any[] = []
      action.payload.map((draft: any ) => {
        if (draft.userId === action.userId) {
          drafts.push(draft)
        }
        return drafts
      })
      return { ...state, userDrafts: drafts }
    case ActionType.CLEAR_DISPLAY:
      return {
        ...state,
        draftId: '',
        userId: '',
        user: '',
        admin: false,
        title: '',
        author: '',
        published: false,
        date: '',
        language: '',
        tags: [],
        description: '',
        philosopher: [],
        messages: [],
        draftEditmode: false,
        write: false
      }
    case ActionType.DELETE_DRAFT:
      return {
        ...state,
        userDrafts: state.userDrafts.filter((draft: any) => draft._id !== action.payload),
      }
    default:
      return state
  }
}


export default drafts