import Dialogs from '../../Services/Dialogs';

const dialogActions = {
  setDialogs: (payload) => ({
    type: 'DIALOGS:SET_DIALOGS',
    payload,
  }),

  fetchDialogs: () => async (dispatch) => {
    try {
      Dialogs.fetchDialogs()
        .then(({ data }) => dispatch(dialogActions.setDialogs(data)))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  },
};

export default dialogActions;
