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
      const { data } = await Dialogs.fetchDialogs();

      if (!data) {
        console.log('error 123');
      }

      return dispatch(dialogActions.setDialogs(data));
    } catch (error) {
      console.log(error);
    }
  },
};

export default dialogActions;
