import { combineReducers } from 'redux'
import title from '../title/reducerTitle.js'
import chats from '../chat/reducerChat.js'
import drafts from '../draft/reducerDraft.js'
import user from '../user/reducerUser.js'

/**
 * main reducer document
 */
let reducers = combineReducers({
  title: title,
  chat: chats,
  draft: drafts,
  user: user,
})

export default reducers
export type RootState = ReturnType<typeof reducers>
