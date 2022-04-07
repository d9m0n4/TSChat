export const auth = (state) => state.auth;

export const user = (state) => auth(state).user;
export const isAuth = (state) => state.auth.isAuth;

export const dialogs = (state) => state.dialogs;
export const dialogId = (state) => dialogs(state).currentDialogId;

export const conversations = (state) => state.conversations;

export const files = (state) => state.files;
