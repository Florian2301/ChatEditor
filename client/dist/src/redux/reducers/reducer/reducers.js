import chats from '../chat/reducerChat';
import { combineReducers } from 'redux';
import drafts from '../draft/reducerDraft';
import title from '../title/reducerTitle';
import user from '../user/reducerUser';
/**
 * main reducer document
 */
let reducers = combineReducers({
    title: title,
    chat: chats,
    draft: drafts,
    user: user,
});
export default reducers;
//# sourceMappingURL=reducers.js.map