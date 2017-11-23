import { QUERY_DEPARTMENT, QUERY_PROCESS, QUERY_USER, QUERY_ORDER, QUERY_EDITABLE } from "../actions/query";

const departments = (state = {
  editable: false,
  department: null,
  process: null,
  user: null
}, action) => {
  switch (action.type) {
    case QUERY_EDITABLE:
      return {
        ...state,
        editable: action.editable
      };

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
      
      case QUERY_USER:
        return {
          ...state,
          user: action.user
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