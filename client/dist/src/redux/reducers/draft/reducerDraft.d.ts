import { Action } from '../../actionTypes/draft/actionTypesDraft';
import { Messages, Philosopher, UserDrafts } from '../../interfaces/interfaces';
interface InitialState {
    draftId: string;
    userId: string;
    user: string;
    admin: boolean;
    title: string;
    author: string;
    published: boolean;
    date: string;
    language: string;
    tags: string[];
    description: string;
    philosopher: Philosopher[];
    colors: string[];
    messages: Messages[];
    userDrafts: UserDrafts[];
    draftEditmode: boolean;
    write: boolean;
}
declare const drafts: (state: InitialState | undefined, action: Action) => {
    philosopher: string;
    draftId: string;
    userId: string;
    user: string;
    admin: boolean;
    title: string;
    author: string;
    published: boolean;
    date: string;
    language: string;
    tags: string[];
    description: string;
    colors: string[];
    messages: Messages[];
    userDrafts: UserDrafts[];
    draftEditmode: boolean;
    write: boolean;
} | {
    colors: string;
    draftId: string;
    userId: string;
    user: string;
    admin: boolean;
    title: string;
    author: string;
    published: boolean;
    date: string;
    language: string;
    tags: string[];
    description: string;
    philosopher: Philosopher[];
    messages: Messages[];
    userDrafts: UserDrafts[];
    draftEditmode: boolean;
    write: boolean;
} | {
    userDrafts: any[];
    draftId: string;
    userId: string;
    user: string;
    admin: boolean;
    title: string;
    author: string;
    published: boolean;
    date: string;
    language: string;
    tags: string[];
    description: string;
    philosopher: Philosopher[];
    colors: string[];
    messages: Messages[];
    draftEditmode: boolean;
    write: boolean;
};
export default drafts;
