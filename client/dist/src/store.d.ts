export declare const store: import("redux").Store<import("redux").EmptyObject & {
    title: never;
    chat: never;
    draft: never;
    user: never;
}, import("./redux/actionTypes/chat/actionTypesChat").Action | import("./redux/actionTypes/draft/actionTypesDraft").Action | import("./redux/actionTypes/title/actionTypesTitle").Action | import("./redux/actionTypes/user/actionTypesUser").Action> & {
    dispatch: unknown;
};
