import { combineReducers } from 'redux'
import title from './titleReducer'
import chats from './chatReducer'
import drafts from './draftReducer'
import users from './userReducer'

/**
 * main reducer document
 */
let reduce = combineReducers({
  title: title,
  chat: chats,
  draft: drafts,
  user: users,
})

export default reduce
