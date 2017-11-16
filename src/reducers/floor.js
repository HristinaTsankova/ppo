import { LOAD_DEPARTMENT_FLOORS_ERROR, LOAD_DEPARTMENT_FLOORS_SUCCESS, LOAD_SINGLE_FLOOR_ERROR, LOAD_SINGLE_FLOOR_SUCCESS } from "../actions/floor";

const floor = (state = {}, action) => {
  switch (action.type) {
    case LOAD_DEPARTMENT_FLOORS_SUCCESS:
      return {
        ...state,
        list: action.list
      };

    case LOAD_DEPARTMENT_FLOORS_ERROR:
      return {
        ...state,
        isListLoadError: action.isListLoadError
      };

    case LOAD_SINGLE_FLOOR_SUCCESS:
      return {
        ...state,
        floor: action.floor
      };

    case LOAD_SINGLE_FLOOR_ERROR:
      return {
        ...state,
        isSingleLoadError: action.isSingleLoadError
      };

    default:
      return state;
  }
}

export default floor;
