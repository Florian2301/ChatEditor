import { ActionType } from '../../actionTypes/chat/actionTypesChat.js';
let initialState = {
    chatId: '',
    userId: '',
    admin: false,
    chatnumber: 0,
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
};
function chats(state = initialState, action) {
    switch (action.type) {
        case ActionType.GET_USER_CHATS:
            return Object.assign(Object.assign({}, state), { userChats: action.payload });
        case ActionType.GET_CHAT:
            return Object.assign(Object.assign({}, state), { chatId: action.payload._id, userId: action.payload.userId, user: action.payload.user, admin: action.payload.admin, chatnumber: action.payload.chatnumber, title: action.payload.title, author: action.payload.author, date: action.payload.date, language: action.payload.language, tags: action.payload.tags, description: action.payload.description, philosopher: action.payload.philosopher, messages: action.payload.messages, chatEditmode: true, comments: action.payload.comments });
        case ActionType.CLEAR_DISPLAY:
            return Object.assign(Object.assign({}, state), { chatId: '', userId: '', user: '', admin: false, chatnumber: '', title: '', author: '', date: '', language: '', tags: [], description: '', philosopher: [], messages: [], chatEditmode: false, comments: [] });
        case 'DELETE_CHAT':
            return Object.assign(Object.assign({}, state), { userChats: state.userChats.filter((chat) => chat._id !== action.payload) });
        default:
            return state;
    }
}
export default chats;
//# sourceMappingURL=reducerChat.js.map