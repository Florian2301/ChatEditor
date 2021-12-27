let initialState = {
  chatId: '',
  userId: '',
  admin: '',
  chatnumber: '',
  title: '',
  author: '',
  date: '',
  language: '',
  tags: [],
  description: '',
  philosopher: [],
  messages: [],
  userChats: [],
  chatEditmode: false,
  comments: [],
}

function chats(state = initialState, action) {
  switch (action.type) {
    case 'GET_USER_CHATS':
      return { ...state, userChats: action.payload }
    case 'GET_CHAT':
      return {
        ...state,
        chatId: action.payload._id,
        userId: action.payload.userId,
        user: action.payload.user,
        admin: action.payload.admin,
        chatnumber: action.payload.chatnumber,
        title: action.payload.title,
        author: action.payload.author,
        date: action.payload.date,
        language: action.payload.language,
        tags: action.payload.tags,
        description: action.payload.description,
        philosopher: action.payload.philosopher,
        messages: action.payload.messages,
        chatEditmode: true,
        comments: action.payload.comments,
      }
    case 'CLEAR_DISPLAY':
      return {
        ...state,
        chatId: '',
        userId: '',
        user: '',
        admin: '',
        chatnumber: '',
        title: '',
        author: '',
        date: '',
        language: '',
        tags: [],
        description: '',
        philosopher: [],
        messages: [],
        chatEditmode: false,
        comments: [],
      }
    case 'DELETE_CHAT':
      return {
        ...state,
        userChats: state.userChats.filter((chat) => chat._id !== action.id),
      }
    default:
      return state
  }
}

export default chats
