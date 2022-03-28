import { ActionType } from '../../actionTypes/user/actionTypesUser';
let initialState = {
    userId: '',
    username: '',
    email: '',
    date: '',
    allUsers: [],
    admin: false,
    loggedIn: false,
    welcome: false,
    signUp: false,
    update: false,
    delete: false,
    modus: 'auto',
    keyL: 'userchats',
    keyR: 'about',
    language: 'deutsch',
    selectLanguage: ['deutsch', 'english'],
    writeComment: false,
};
function users(state = initialState, action) {
    switch (action.type) {
        case ActionType.ADD_USER:
            return Object.assign(Object.assign({}, state), { username: action.username, email: action.email, signUp: true });
        case ActionType.GET_USER:
            return Object.assign(Object.assign({}, state), { userId: action.payload._id, username: action.payload.username, email: action.payload.email, admin: action.payload.admin, date: action.payload.date, allUsers: action.payload, loggedIn: true, signUp: false, writeComment: false });
        case ActionType.GET_ALL_USERS:
            return Object.assign(Object.assign({}, state), { allUsers: action.payload });
        case ActionType.WELCOME:
            return Object.assign(Object.assign({}, state), { welcome: true });
        case ActionType.UPDATE_USER:
            return Object.assign(Object.assign({}, state), { update: true, welcome: false });
        case ActionType.CHANGE_MODUS:
            return Object.assign(Object.assign({}, state), { modus: action.payload });
        case ActionType.SELECT_LANGUAGE:
            return Object.assign(Object.assign({}, state), { language: action.payload });
        case ActionType.WRITE_COMMENT:
            return Object.assign(Object.assign({}, state), { writeComment: action.payload });
        case ActionType.CLEAR_DISPLAY:
            return Object.assign(Object.assign({}, state), { writeComment: false });
        case ActionType.CANCEL:
            return Object.assign(Object.assign({}, state), { update: false, welcome: false });
        case ActionType.LOGOUT:
            return Object.assign(Object.assign({}, state), { userId: '', username: '', email: '', date: '', allUsers: [], admin: false, loggedIn: false, welcome: false, signUp: false, update: false, delete: false, keyL: 'userchats', keyR: 'about' });
        case ActionType.SET_KEY_L:
            return Object.assign(Object.assign({}, state), { keyL: action.payload });
        case ActionType.SET_KEY_R:
            return Object.assign(Object.assign({}, state), { keyR: action.payload });
        case ActionType.DELETE_USER:
            return Object.assign(Object.assign({}, initialState), { delete: true });
        default:
            return state;
    }
}
export default users;
//# sourceMappingURL=reducerUser.js.map