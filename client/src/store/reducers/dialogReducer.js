const initialState = {
  dialogs: [],
  currentDialogId: window.location.pathname.split('dialog/')[1],
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

    default:
      return state;
  }
};
