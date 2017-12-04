import { LOAD_DEPARTMENTS_SUCCESS, LOAD_SINGLE_DEPARTMENT_SUCCESS } from "../actions/departments";

const departments = (state = {
}, action) => {
  switch (action.type) {
    case LOAD_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        list: action.list
      };

    case LOAD_SINGLE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        department: action.department
      };

    default:
      return state;
  }
}

export default departments;
