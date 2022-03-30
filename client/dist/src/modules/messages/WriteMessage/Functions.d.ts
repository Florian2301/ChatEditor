import { Messages } from '../../../redux/interfaces/interfaces';
export declare function insertToNewPosition(allMessages: Messages[], newMessage: string, sortMessage: number, replaceMessageNumber: number, positionPhil: number, name: string, color: string): Messages[];
export declare function repliedMessage(allMessages: Messages[], messagenumber: number, sendMessage: string, number: number, positionPhil: number, name: string, color: string): Messages[];
