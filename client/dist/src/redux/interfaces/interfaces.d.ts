export interface Philosopher {
    name: string;
    color: string;
}
export interface Messages {
    _id?: string;
    messagenumber: number;
    name: string;
    text: string;
    time?: string;
    color: string;
    position: number;
    tags?: string[];
    repliedmessage?: string[];
}
export interface Comments {
    name: string;
    date: string;
    text: string;
    author: boolean;
}
export interface ChatboxMessages {
    _id?: string;
    messagenumber: number;
    name: string;
    text: string;
    time?: string;
    color: string;
    position: number;
    tags?: string[];
    repliedmessage?: string[];
}
export interface Draft {
    _id: string;
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
}
export interface UserDrafts {
    userDrafts: Draft[];
}
export interface StateDraft {
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
export interface Title {
    _id: string;
    chatId: string;
    admin: boolean;
    userId: string;
    user: string;
    chatnumber: number | string;
    title: string;
    author: string;
    date: string;
    language: string;
    tags: string[];
    description: string;
}
export interface UserTitles {
    userTitles: Title[];
}
export interface AllTitles {
    allTitles: Title[];
}
export interface StateTitle {
    titleId: string;
    userId: string;
    admin: boolean;
    chatId: string;
    chatnumber: number | string;
    title: string;
    author: string;
    date: string;
    language: string;
    tags: string[];
    description: string;
    userTitles: UserTitles[];
    allTitles: AllTitles[];
    publish: boolean | number;
}
export interface Chat {
    _id: string;
    admin: boolean;
    userId: string;
    user: string;
    chatnumber: number;
    title: string;
    titleId: string;
    author: string;
    date: string;
    language: string;
    tags: string[];
    description: string;
    philosopher: Philosopher[];
    messages: Messages[];
    comments: Comments[];
}
export interface UserChats {
    userChats: Chat[];
}
export interface StateChat {
    chatId: string;
    userId: string;
    admin: boolean;
    chatnumber: number;
    title: string;
    author: string;
    date: string;
    language: string;
    tags: string[];
    description: string;
    philosopher: Philosopher[];
    messages: Messages[];
    userChats: UserChats[];
    chatEditmode: boolean;
    comments: Comments[];
}
export interface User {
    _id: string;
    username: string;
    email: string;
    admin: boolean;
    date: string;
}
export interface AllUser {
    allUsers: User[];
}
export interface StateUser {
    userId: string;
    username: string;
    email: string;
    date: string;
    allUsers: AllUser[];
    admin: boolean;
    loggedIn: boolean;
    welcome: boolean;
    signUp: boolean;
    update: boolean;
    delete: boolean;
    modus: string;
    keyL: string;
    keyR: string;
    language: string;
    selectLanguage: string[];
    writeComment: boolean;
}
