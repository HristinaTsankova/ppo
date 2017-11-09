export const QUERY_PROCESS = 'QUERY_PROCESS';
export const QUERY_DEPARTMENT = 'QUERY_DEPARTMENT';

export function setQueryValue(val, type) {
  return dispatch => {
    switch (type) {
      case QUERY_PROCESS:
        dispatch(setProcess(val));
        break;
      
      case QUERY_DEPARTMENT:
        dispatch(setDepartment(val));
        break;

      default:
        break;
    }
  }
}

function setDepartment(dept) {
  return {
    type: QUERY_DEPARTMENT,
    department: dept
  };
}

function setProcess(proc) {
  return {
    type: QUERY_PROCESS,
    process: proc
  };
}
