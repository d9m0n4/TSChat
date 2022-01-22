import socket from '../../core/socket';
import Dialogs from '../../Services/Dialogs';

const dialogActions = {
  setDialogs: (payload) => ({
    type: 'DIALOGS:SET_DIALOGS',
    payload,
  }),
  setPartner: (payload) => ({
    type: 'DIALOG:SET_CURRENT_PARTNER',
    payload,
  }),

  setCurrentDialogId: (id) => (dispatch, getState) => {
    const { dialogs } = getState();
    let partner = dialogs.dialogs.filter((dialog) => dialog.dialogId === id)[0];
    console.log(partner);
    dispatch({
      type: 'DIALOG:SET_CURRENT_DIALOG_ID',
      payload: id,
    });

    dispatch(dialogActions.setPartner(partner));
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
