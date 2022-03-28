import { Action } from '../../actionTypes/chat/actionTypesChat';
import { Comments, Messages, Philosopher } from '../../interfaces/interfaces';
import { Dispatch } from 'redux';
export declare const saveChat: (userId: String, user: String, chatnumber: Number, title: String, author: String, date: String, language: String, tags: String[], description: String, philosopher: Philosopher[], messages: Messages[], admin: Boolean, comments: Comments[]) => (dispatch: Dispatch<Action>) => void;
export declare const getUserChats: (userId: string) => (dispatch: Dispatch<Action>) => void;
export declare const getOneChat: (id: string) => (dispatch: Dispatch<Action>) => void;
export declare const updateChatDetails: (id: String, chatnumber: Number, title: String, author: String, date: String, language: String, tags: String[], description: String, admin: Boolean, comments: Comments[]) => (dispatch: Dispatch<Action>) => void;
export declare const updateChat: (id: string, messagenumber: number, text: string) => (dispatch: Dispatch<Action>) => void;
export declare const deleteChat: (id: string) => (dispatch: Dispatch<Action>) => void;
