import {SELECT_DEPARTMENT} from "../actions/departments";

const departments = (state = {
  selectedDepartment: -1,
}, action) => {
  switch (action.type) {
    case SELECT_DEPARTMENT:
      return {...state,
        selectedDepartment: action.selsectDepartment
      };

    default:
      return state;
  }
}

export default departments;