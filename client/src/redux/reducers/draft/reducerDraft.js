import { ActionType } from '../../actionTypes/draft/actionTypesDraft.js';
let initialState = {
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
};
const drafts = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.ADD_PHIL:
            return Object.assign(Object.assign({}, state), { philosopher: action.payload });
        case ActionType.SELECT_COLOR:
            return Object.assign(Object.assign({}, state), { colors: state.colors.filter((color) => color !== action.payload) });
        case ActionType.ADD_COLOR:
            return Object.assign(Object.assign({}, state), { colors: action.payload });
        case ActionType.WRITE_MESSAGE:
            return Object.assign(Object.assign({}, state), { write: action.payload });
        case ActionType.GET_DRAFT:
            return Object.assign(Object.assign({}, state), { draftId: action.payload._id, userId: action.payload.userId, user: action.payload.user, admin: action.payload.admin, title: action.payload.title, author: action.payload.author, published: action.payload.published, date: action.payload.date, language: action.payload.language, tags: action.payload.tags, description: action.payload.description, philosopher: action.payload.philosopher, messages: action.payload.messages, draftEditmode: true });
        case ActionType.GET_USER_DRAFTS:
            let drafts = [];
            action.payload.map((draft) => {
                if (draft.userId === action.userId) {
                    drafts.push(draft);
                }
                return drafts;
            });
            return Object.assign(Object.assign({}, state), { userDrafts: drafts });
        case ActionType.CLEAR_DISPLAY:
            return Object.assign(Object.assign({}, state), { draftId: '', userId: '', user: '', admin: false, title: '', author: '', published: false, date: '', language: '', tags: [], description: '', philosopher: [], messages: [], draftEditmode: false, write: false });
        case ActionType.DELETE_DRAFT:
            return Object.assign(Object.assign({}, state), { userDrafts: state.userDrafts.filter((draft) => draft._id !== action.payload) });
        default:
            return state;
    }
};
export default drafts;
//# sourceMappingURL=reducerDraft.js.map