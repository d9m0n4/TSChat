export const auth = (state) => state.auth;

export const user = (state) => auth(state).user;
export const userId = (state) => auth(state).user.id;
export const isAuth = (state) => state.auth.isAuth;

export const dialogs = (state) => state.dialogs;
export const dialogId = (state) => dialogs(state).currentDialogId;

export const conversations = (state) => state.conversations;
export const currentConversation = (state) => conversations(state).currentConversation;
export const convMembers = (state) => currentConversation(state).members;
export const currentConvId = (state) => state.conversations.currentConvId;

export const files = (state) => state.files;

export const messages = (state) => state.messages;

export const isShown = (state) => state.rightBar;
