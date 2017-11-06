export const SELECT_DEPARTMENT = 'SELECT_DEPARTMENT';

export function selsectDepartment(dept) {
  return dispatch => {
    dispatch(setDepartment(dept));
  }
}

function setDepartment(dept) {
  return {
    type: SELECT_DEPARTMENT,
    selsectDepartment: dept
  };
}
