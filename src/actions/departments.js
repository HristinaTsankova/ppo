import Constants from '../utils/constants';

export const LOAD_DEPARTMENTS_SUCCESS = 'LOAD_DEPARTMENTS_SUCCESS';
export const LOAD_DEPARTMENTS_ERROR = 'LOAD_DEPARTMENT_ERROR';

export const LOAD_SINGLE_DEPARTMENT_SUCCESS = 'LOAD_SINGLE_DEPARTMENT_SUCCESS';
export const LOAD_SINGLE_DEPARTMENT_ERROR = 'LOAD_SINGLE_DEPARTMENT_ERROR';

export function loadAllDepartments() {
  return dispatch => {
    dispatch(loadDepartmentsSuccess({}));
    dispatch(loadDepartmentsError(null));

    callDepartmentsApi(null, (data, error) => {
      if (!error) {
        dispatch(loadDepartmentsSuccess(data));
      } else {
        dispatch(loadDepartmentsError(error));
      }
    });
  }
}

export function loadDepartmentById(orderId) {
  return dispatch => {
    dispatch(loadSingleDepartmentSuccess({}));
    dispatch(loadSingleDepartmentError(null));

    callDepartmentsApi(orderId, (data, error) => {
      if (!error) {
        dispatch(loadSingleDepartmentSuccess(data));
      } else {
        dispatch(loadSingleDepartmentError(error));
      }
    });
  }
}

function loadDepartmentsSuccess(data) {
  return {
    type: LOAD_DEPARTMENTS_SUCCESS,
    list: data
  };
}

function loadDepartmentsError(isLoadError) {
  return {
    type: LOAD_DEPARTMENTS_ERROR,
    isListLoadError: isLoadError
  };
}

function loadSingleDepartmentSuccess(data) {
  return {
    type: LOAD_SINGLE_DEPARTMENT_SUCCESS,
    department: data
  };
}

function loadSingleDepartmentError(isLoadError) {
  return {
    type: LOAD_SINGLE_DEPARTMENT_ERROR,
    isLoadError: isLoadError
  };
}

async function callDepartmentsApi(order, callback) {
  const BASE_URL = Constants.remoteServer + '/api/fp/departments' + ((order != null) ? '/' + order : '');
  const request = { method: 'GET', headers: Constants.headers }

  try {
    const response = await fetch(BASE_URL, request);
    const json = await response.json();
    if (response.ok) {
      return callback(json);
    } else {
      console.log(json);
      return callback({}, new Error('Unknown error!'));
    }
  } catch (error) {
    return callback({}, new Error('Unable to load order/s!'));
  }
}