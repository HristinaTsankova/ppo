import {LOAD_DEPARTMENTS_SUCCESS, LOAD_DEPARTMENTS_ERROR} from "../actions/departments";

const orders = (state = {
}, action) => {
  switch (action.type) {
    case LOAD_DEPARTMENTS_SUCCESS:
      return {...state,
        list: action.list
      };

    case LOAD_DEPARTMENTS_ERROR:
      return {...state,
        isListLoadError: action.isListLoadError
      };

    default:
      return state;
  }
}

export default orders;
