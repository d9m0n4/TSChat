import Users from '../../Services/Users';

const userActions = {
  setUsers: (payload) => ({
    type: 'USERS:SET_USERS',
    payload,
  }),

  fetchUsers: (payload) => async (dispatch) => {
    try {
      await Users.findUsers(payload);
      dispatch(userActions.setUsers(payload));
    } catch (error) {
      console.log(error);
    }
  },
};

export default userActions;
