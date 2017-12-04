import { LOAD_USERS_SUCCESS } from "../actions/users";

const users = (state = {
  data: {}
}, action) => {
  switch (action.type) {
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        data: action.data
      };

    default:
      return state;
  }
}

export default users;