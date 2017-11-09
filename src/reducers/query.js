import { QUERY_DEPARTMENT, QUERY_PROCESS } from "../actions/query";

const departments = (state = {
  department: null,
  process: null
}, action) => {
  switch (action.type) {
    case QUERY_DEPARTMENT:
      return {...state,
        department: action.department
      };
    case QUERY_PROCESS:
      return {...state,
        process: action.process
      };

    default:
      return state;
  }
}

export default departments;