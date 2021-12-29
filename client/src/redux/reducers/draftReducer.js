let initialState = {
  draftId: '',
  userId: '',
  user: '',
  admin: '',
  title: '',
  author: '',
  published: '',
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

function drafts(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PHIL':
      return { ...state, philosopher: action.names }
    case 'SELECT_COLOR':
      return {
        ...state,
        colors: state.colors.filter((color) => color !== action.color),
      }
    case 'ADD_COLOR':
      return {
        ...state,
        colors: action.color,
      }
    case 'WRITE_MESSAGE':
      return { ...state, write: action.write }
    case 'GET_DRAFT':
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
    case 'GET_USER_DRAFTS':
      let drafts = []
      action.payload.map((draft) => {
        if (draft.userId === action.userId) {
          drafts.push(draft)
        }
        return drafts
      })
      return { ...state, userDrafts: drafts }
    case 'CLEAR_DISPLAY':
      return {
        ...state,
        draftId: '',
        userId: '',
        user: '',
        admin: '',
        title: '',
        author: '',
        published: '',
        date: '',
        language: '',
        tags: [],
        description: '',
        philosopher: [],
        messages: [],
        draftEditmode: false,
      }
    case 'DELETE_DRAFT':
      return {
        ...state,
        userDrafts: state.userDrafts.filter((draft) => draft._id !== action.id),
      }
    default:
      return state
  }
}

export default drafts
