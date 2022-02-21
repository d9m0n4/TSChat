const initialState = {
  dialogs: [],
  isLoading: false,
  currentDialogId: window.location.pathname.split('dialogs/')[1],
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

    default:
      return state;
  }
};
