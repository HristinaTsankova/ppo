import {LOAD_USERS_SUCCESS, LOAD_USERS_ERROR} from "../actions/users";

const users = (state = {
  data: {},
  isLoadError: null
}, action) => {
  switch (action.type) {
    case LOAD_USERS_SUCCESS:
      return {...state,
        data: action.data
      };

    case LOAD_USERS_ERROR:
      return {...state,
        isLoadError: action.isLoadError
      };

    default:
      return state;
  }
}

export default users;