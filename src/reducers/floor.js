import { LOAD_DEPARTMENT_FLOORS_SUCCESS, LOAD_SINGLE_FLOOR_SUCCESS } from "../actions/floor";

const floor = (state = {}, action) => {
  switch (action.type) {
    case LOAD_DEPARTMENT_FLOORS_SUCCESS:
      return {
        ...state,
        list: action.list
      };

    case LOAD_SINGLE_FLOOR_SUCCESS:
      return {
        ...state,
        floor: action.floor
      };

    default:
      return state;
  }
}

export default floor;
