import socket from '../../core/socket';
import Dialogs from '../../Services/Dialogs';

const dialogActions = {
  setDialogs: (payload) => ({
    type: 'DIALOGS:SET_DIALOGS',
    payload,
  }),
  setCurrentDialogId: (id) => (dispatch) => {
    dispatch({
      type: 'DIALOG:SET_CURRENT_DIALOG_ID',
      payload: id,
    });
    socket.emit('DIALOGS:SET_DIALOG_ID', id);
  },

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
