import Constants from '../utils/constants';

export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR';

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
    type: LOAD_USERS_ERROR,
    isLoadError
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
      return callback({}, new Error('Unknown error!'));
    }
  } catch (error) {
    return callback({}, new Error('Unable to load users!'));
  }
}