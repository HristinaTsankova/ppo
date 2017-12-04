import Constants from '../utils/constants';
import { LOAD_GENERAL_ERROR } from '../reducers/errors';

export const LOAD_DEPARTMENTS_SUCCESS = 'LOAD_DEPARTMENTS_SUCCESS';
export const LOAD_SINGLE_DEPARTMENT_SUCCESS = 'LOAD_SINGLE_DEPARTMENT_SUCCESS';

export function loadAllDepartments() {
  return dispatch => {
    callDepartmentsApi(null, (data, error) => {
      if (!error) {
        dispatch(loadDepartmentsSuccess(data));
      } else {
        dispatch(loadDepartmentsError(error));
      }
    });
  };
}

export function loadDepartmentById(depId, callback) {
  return dispatch => {
    callDepartmentsApi(depId, (data, error) => {
      if (!error) {
        dispatch(loadSingleDepartmentSuccess(data));
        if (callback !== undefined) {
          callback(data);
        }
      } else {
        dispatch(loadDepartmentsError(error));
      }
    });
  };
}

function loadDepartmentsSuccess(data) {
  return {
    type: LOAD_DEPARTMENTS_SUCCESS,
    list: data
  };
}

function loadDepartmentsError(isLoadError) {
  return {
    type: LOAD_GENERAL_ERROR,
    isError: isLoadError
  };
}

function loadSingleDepartmentSuccess(data) {
  return {
    type: LOAD_SINGLE_DEPARTMENT_SUCCESS,
    department: data
  };
}

export async function callDepartmentsApi(department, callback) {
  const BASE_URL = Constants.remoteServer + '/api/fp/departments' + ((department != null) ? '/' + department : '');
  const request = { method: 'GET', headers: Constants.headers };

  try {
    const response = await fetch(BASE_URL, request);
    const json = await response.json();
    if (response.ok) {
      return callback(json);
    } else {
      return callback({}, new Error('Неизвестна грешка!'));
    }
  } catch (error) {
    let msg = 'Неуспешен опит да заредим бригадите!';
    if (department !== null) {
      msg = 'Неуспешен опит да заредим бригадата!';
    }
    return callback({}, new Error(msg));
  }
}