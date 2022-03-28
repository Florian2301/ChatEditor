/**
 * main reducer document
 */
declare let reducers: import("redux").Reducer<import("redux").CombinedState<{
    title: never;
    chat: never;
    draft: never;
    user: never;
}>, import("../../actionTypes/chat/actionTypesChat").Action | import("../../actionTypes/draft/actionTypesDraft").Action | import("../../actionTypes/title/actionTypesTitle").Action | import("../../actionTypes/user/actionTypesUser").Action>;
export default reducers;
export declare type RootState = ReturnType<typeof reducers>;
