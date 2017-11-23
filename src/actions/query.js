export const QUERY_PROCESS = 'QUERY_PROCESS';
export const QUERY_USER = 'QUERY_USER';
export const QUERY_DEPARTMENT = 'QUERY_DEPARTMENT';
export const QUERY_ORDER = 'QUERY_ORDER';
export const QUERY_EDITABLE = 'QUERY_EDITABLE';

export function setQueryValue(val, type, callback) {
  return dispatch => {
    switch (type) {
      case QUERY_EDITABLE:
        dispatch(setEditable(val));
        break;

      case QUERY_ORDER:
        dispatch(setOrder(val, callback));
        break;

      case QUERY_PROCESS:
        dispatch(setProcess(val));
        break;
        
      case QUERY_USER:
        dispatch(setUser(val));
        break;
      
      case QUERY_DEPARTMENT:
        dispatch(setDepartment(val));
        break;

      default:
        break;
    }
  }
}

function setEditable(val) {
  return {
    type: QUERY_EDITABLE,
    editable: val
  };
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

function setUser(user) {
  return {
    type: QUERY_USER,
    user: user
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