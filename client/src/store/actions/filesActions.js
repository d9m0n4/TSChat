import Files from '../../Services/Files';

const filesActions = {
  setFiles: (payload) => ({
    type: 'FILES:SET_FILES',
    payload,
  }),

  getFiles: (payload) => async (dispatch) => {
    try {
      const { data } = await Files.get(payload);
      dispatch(filesActions.setFiles(data));
    } catch (error) {
      console.log(error);
    }
  },
};

export default filesActions;
