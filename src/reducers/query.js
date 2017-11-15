import { QUERY_DEPARTMENT, QUERY_PROCESS, QUERY_ORDER } from "../actions/query";

const departments = (state = {
  department: null,
  process: null
}, action) => {
  switch (action.type) {
    case QUERY_DEPARTMENT:
      return {
        ...state,
        department: action.department
      };

    case QUERY_PROCESS:
      return {
        ...state,
        process: action.process
      };

    case QUERY_ORDER:
      return {
        ...state,
        order: action.order
      };

    default:
      return state;
  }
}

export default departments;