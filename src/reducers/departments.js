import { LOAD_DEPARTMENTS_SUCCESS, LOAD_DEPARTMENTS_ERROR, LOAD_SINGLE_DEPARTMENT_SUCCESS, LOAD_SINGLE_DEPARTMENT_ERROR } from "../actions/departments";

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

    case LOAD_SINGLE_DEPARTMENT_SUCCESS:
      return {...state,
        department: action.department
      };

    case LOAD_SINGLE_DEPARTMENT_ERROR:
      return {...state,
        isSingleLoadError: action.isSingleLoadError
      };

    default:
      return state;
  }
}

export default orders;
