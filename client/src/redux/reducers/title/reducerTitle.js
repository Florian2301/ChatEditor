import { ActionType } from '../../actionTypes/title/actionTypesTitle.js';
let initialState = {
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
};
const title = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.GET_ALL_TITLES:
            return Object.assign(Object.assign({}, state), { allTitles: action.payload });
        case ActionType.GET_USER_TITLES:
            return Object.assign(Object.assign({}, state), { userTitles: action.payload });
        case ActionType.GET_TITLE:
            return Object.assign(Object.assign({}, state), { titleId: action.payload._id, userId: action.payload.userId, user: action.payload.user, chatId: action.payload.chatId, chatnumber: action.payload.chatnumber, title: action.payload.title, author: action.payload.author, date: action.payload.date, language: action.payload.language, tags: action.payload.tags, description: action.payload.description, admin: action.payload.admin });
        case ActionType.DELETE_TITLE:
            return Object.assign(Object.assign({}, state), { allTitles: state.allTitles.filter((title) => title._id !== action.payload) });
        case ActionType.CLEAR_DISPLAY:
            return Object.assign(Object.assign({}, state), { titleId: '', userId: '', admin: false, chatId: '', chatnumber: '', title: '', author: '', date: '', language: '', tags: '', description: '', publish: false });
        case ActionType.PUBLISH:
            return Object.assign(Object.assign({}, state), { publish: action.payload });
        default:
            return state;
    }
};
export default title;
//# sourceMappingURL=reducerTitle.js.map