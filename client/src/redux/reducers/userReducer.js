let initialState = {
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
  modus: 'auto',
  keyL: 'adminchats',
  keyR: 'about',
  language: 'deutsch',
  selectLanguage: ['deutsch', 'english'],
  writeComment: false,
}

function users(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        signUp: true,
      }
    case 'GET_USER':
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
    case 'GET_ALL_USERS':
      return { ...state, allUsers: action.payload }
    case 'WELCOME':
      return { ...state, welcome: true }
    case 'UPDATE_USER':
      return { ...state, update: true, welcome: false }
    case 'CHANGE_MODUS':
      return { ...state, modus: action.modus }
    case 'SELECT_LANGUAGE':
      return { ...state, language: action.language }
    case 'WRITE_COMMENT':
      return { ...state, writeComment: action.comment }
    case 'CLEAR_DISPLAY':
      return { ...state, writeComment: false }
    case 'CANCEL':
      return { ...state, update: false, welcome: false }
    case 'LOGOUT':
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
        keyL: 'adminchats',
        keyR: 'about',
      }
    case 'SET_KEY_L':
      return { ...state, keyL: action.key }
    case 'SET_KEY_R':
      return { ...state, keyR: action.key }
    case 'DELETE_USER':
      return { ...initialState, delete: true }
    default:
      return state
  }
}

export default users
