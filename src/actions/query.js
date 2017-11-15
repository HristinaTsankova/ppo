export const QUERY_PROCESS = 'QUERY_PROCESS';
export const QUERY_DEPARTMENT = 'QUERY_DEPARTMENT';
export const QUERY_ORDER = 'QUERY_ORDER';

export function setQueryValue(val, type, callback) {
  return dispatch => {
    switch (type) {
      case QUERY_ORDER:
        dispatch(setOrder(val, callback));
        break;

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

function setOrder(order, callback) {
  if (callback !== undefined) {
    callback(order);
  }
  return {
    type: QUERY_ORDER,
    order: order
  };
}