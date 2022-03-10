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
  setLoading: (payload) => ({
    type: 'DIALOG:SET_LOADING',
    payload,
  }),

  setCurrentDialogId: (id) => (dispatch) => {
    dispatch({
      type: 'DIALOG:SET_CURRENT_DIALOG_ID',
      payload: id,
    });
    socket.emit('DIALOGS:SET_DIALOG_ID', id);
  },

  setCurrentPartner: (partner) => (dispatch) => {
    dispatch(dialogActions.setPartner(partner));
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
