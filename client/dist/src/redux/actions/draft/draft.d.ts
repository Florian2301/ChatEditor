import { Action, ActionType } from '../../actionTypes/draft/actionTypesDraft';
import { Messages, Philosopher } from '../../interfaces/interfaces';
import { Dispatch } from 'redux';
export declare function addPhil(names: Philosopher[]): {
    type: ActionType;
    payload: Philosopher[];
};
export declare function selectColor(color: string): {
    type: ActionType;
    payload: string;
};
export declare function addColor(color: string[]): {
    type: ActionType;
    payload: string[];
};
export declare function writeMessage(write: boolean): {
    type: ActionType;
    payload: boolean;
};
export declare const saveDraft: (userId: String, user: String, title: String, author: String, date: String, language: String, tags: String[], description: String, philosopher: Philosopher[], messages: Messages[], admin: Boolean) => (dispatch: Dispatch<Action>) => void;
export declare const getDrafts: (userId: string) => (dispatch: Dispatch<Action>) => void;
export declare const getOneDraft: (id: string) => (dispatch: Dispatch<Action>) => void;
export declare const deleteDraft: (id: string) => (dispatch: Dispatch<Action>) => void;
export declare const deleteDraftMessage: (id: string, messages: Messages[]) => (dispatch: Dispatch<Action>) => void;
export declare const editDraft: (draftId: string, messagenumber: number, text: string) => (dispatch: Dispatch<Action>) => void;
export declare const updateDraft: (id: String, title: String, author: String, published: Boolean, date: String, language: String, tags: String[], description: String, philosopher: Philosopher[], messages: Messages[], admin: Boolean) => (dispatch: Dispatch<Action>) => void;
