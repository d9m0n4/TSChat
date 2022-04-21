import socket from '../../api/socket';
import openNotification from '../../helpers/notifications/openNotification';
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
  setMessagesCount: (payload) => ({
    type: 'DIALOG:UPDATE_COUNT',
    payload,
  }),

  setUserOnline: (id) => (dispatch) => {
    dispatch({
      type: 'SET_USER_ONLINE',
      payload: id,
    });
  },

  updateDialogUnreadMessagesCount: (id) => (dispatch) => {
    dispatch(dialogActions.setMessagesCount(id));
  },

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
        openNotification('error', 'Ошибка', 'Данные не получены', 3);
      }

      return dispatch(dialogActions.setDialogs(data));
    } catch (error) {
      console.log(error);
    }
  },
};

export default dialogActions;
