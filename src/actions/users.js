import Constants from '../utils/constants';
import { LOAD_GENERAL_ERROR } from '../reducers/errors';

export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';

export function loadAllUsers() {
  return dispatch => {
    dispatch(loadUsersSuccess({}));
    dispatch(loadUsersError(null));

    callUsersApi((data, error) => {
      if (!error) {
        dispatch(loadUsersSuccess(data));
      } else {
        dispatch(loadUsersError(error));
      }
    });
  }
}

function loadUsersSuccess(data) {
  return {
    type: LOAD_USERS_SUCCESS,
    data
  };
}

function loadUsersError(isLoadError) {
  return {
    type: LOAD_GENERAL_ERROR,
    isError: isLoadError
  };
}

export async function callUsersApi(callback) {
  const BASE_URL = Constants.remoteServer + '/api/fp/users'
  const request = { method: 'GET', headers: Constants.headers }

  try {
    const response = await fetch(BASE_URL, request);
    const json = await response.json();
    if (response.ok) {
      return callback(json);
    } else {
      console.log(json);
      return callback({}, new Error('Неизвестна грешка!'));
    }
  } catch (error) {
    return callback({}, new Error('Неуспешен опит да заредим работниците!'));
  }
}