const rightBarActions = {
  setActive: (payload) => ({
    type: 'RIGHTBAR:SET_ACTIVE',
    payload,
  }),

  setIsShown: (payload) => (dispatch) => {
    dispatch(rightBarActions.setActive(payload));
  },
};

export default rightBarActions;
