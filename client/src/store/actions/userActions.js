import Users from '../../Services/Users';

const userActions = {
  setUsers: (payload) => ({
    type: 'USERS:SET_USERS',
    payload,
  }),

  fetchUsers: (payload) => async (dispatch) => {
    try {
      const userData = await Users.findUsers(payload);
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  },
};

export default userActions;
