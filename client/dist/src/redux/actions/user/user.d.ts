import { Action, ActionType } from '../../actionTypes/user/actionTypesUser';
import { Dispatch } from 'redux';
export declare function clearDisplay(): {
    type: ActionType;
};
export declare function welcome(): {
    type: ActionType;
};
export declare function cancel(): {
    type: ActionType;
};
export declare function logOut(): {
    type: ActionType;
};
export declare function setKeyL(key: string): {
    type: ActionType;
    payload: string;
};
export declare function setKeyR(key: string): {
    type: ActionType;
    payload: string;
};
export declare function changeModus(modus: string): {
    type: ActionType;
    payload: string;
};
export declare function selectLanguage(language: string): {
    type: ActionType;
    payload: string;
};
export declare function writeComment(comment: boolean): {
    type: ActionType;
    payload: boolean;
};
export declare const addUserToDB: (userName: string, userEmail: string) => (dispatch: Dispatch<Action>) => void;
export declare const getUser: (username?: string | undefined) => (dispatch: Dispatch<Action>) => void;
export declare const updateUserDB: (id: string, username: string, email: string, chats?: string | undefined) => (dispatch: Dispatch<Action>) => void;
export declare const deleteUserDB: (id: string) => (dispatch: Dispatch<Action>) => void;
