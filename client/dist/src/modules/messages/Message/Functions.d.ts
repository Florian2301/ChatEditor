import { Messages } from '../../../redux/interfaces/interfaces';
export declare function selectNewNumberAndSortMessages(editedMessage: string, newMessageNumber: number, oldMessageNumber: number, shiftMessage: Messages, changeMessage: Messages, messages: Messages[], findIndexShift: Messages, findIndexChange: Messages): Messages[];
