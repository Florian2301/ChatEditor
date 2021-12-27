let initialState = {
  titleId: '',
  userId: '',
  admin: '',
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

function title(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_TITLES':
      return { ...state, allTitles: action.payload }
    case 'GET_USER_TITLES':
      return { ...state, userTitles: action.payload }
    case 'GET_TITLE':
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
    case 'DELETE_TITLE':
      return {
        ...state,
        allTitles: state.allTitles.filter((title) => title._id !== action.id),
      }
    case 'CLEAR_DISPLAY':
      return {
        ...state,
        titleId: '',
        userId: '',
        admin: '',
        chatId: '',
        chatnumber: '',
        title: '',
        author: '',
        date: '',
        language: '',
        tags: [],
        description: '',
        publish: false,
      }
    case 'PUBLISH':
      return { ...state, publish: action.publish }
    default:
      return state
  }
}

export default title
