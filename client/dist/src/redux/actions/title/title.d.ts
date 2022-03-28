import { Action, ActionType } from '../../actionTypes/title/actionTypesTitle';
import { Dispatch } from 'redux';
export declare function publishTitle(publish: boolean | number): {
    type: ActionType;
    payload: number | boolean;
};
export declare const saveTitle: (chatId: String, userId: String, user: String, chatnumber: Number, title: String, author: String, date: String, language: String, tags: String[], description: String, admin: Boolean) => (dispatch: Dispatch<Action>) => void;
export declare const getAllTitles: () => (dispatch: Dispatch<Action>) => void;
export declare const getOneTitle: (id: string) => (dispatch: Dispatch<Action>) => void;
export declare const getUserTitles: (userId: string) => (dispatch: Dispatch<Action>) => void;
export declare const deleteTitle: (id: string) => (dispatch: Dispatch<Action>) => void;
export declare const updateTitle: (id: string, chatnumber: number, title: string, author: string, date: string, language: string, tags: string[], description: string, admin: boolean) => (dispatch: Dispatch<Action>) => void;
