const initialState = {
  dialogs: null || [],
  isLoading: false,
  currentDialogId: null,
  currentPartner: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'DIALOGS:SET_DIALOGS':
      return {
        ...state,
        dialogs: payload,
      };

    case 'DIALOG:SET_CURRENT_DIALOG_ID':
      return {
        ...state,
        currentDialogId: payload,
      };

    case 'DIALOG:SET_CURRENT_PARTNER':
      return {
        ...state,
        currentPartner: payload,
      };
    case 'DIALOG:SET_LOADING':
      return {
        ...state,
        isLoading: payload,
      };
    case 'DIALOG:UPDATE_COUNT':
      return {
        ...state,
        dialogs: state.dialogs.map((dialog) => {
          if (dialog.dialogId === payload.id && dialog.lastMessage.user !== payload.user) {
            dialog.count = 0;
          }
          return dialog;
        }),
      };
    case 'MESSAGES:UPDATE_READSTATUS':
      return {
        ...state,
        dialogs: state.dialogs.map((dialog) => {
          if (
            dialog.lastMessage.user._id !== payload.userId &&
            dialog.dialogId === payload.dialogId
          ) {
            dialog.lastMessage.readStatus = true;
          }
          return dialog;
        }),
      };
    case 'SET_USER_ONLINE':
      return {
        ...state,
        dialogs: state.dialogs.map((dialog) => {
          console.log(payload.id);
          if (dialog.partner._id === payload.id) {
            console.log(payload);
          }
          return dialog;
        }),
      };

    default:
      return state;
  }
};
