import Constants from '../utils/constants';

export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    callLoginApi(email, password, error => {
      if (!error) {
        dispatch(setLoginSuccess(true));
      } else {
        dispatch(setLoginError(error));
      }
    });
  }
}

export function logout () {
  return dispatch => {
    Constants.deleteToken();
    dispatch(setLoginSuccess(false));
  }
}

export function isLoggedIn() {
  return dispatch => {
    if (Constants.token != null) {
      dispatch(setLoginSuccess(true));
    }
  }
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

async function callLoginApi(username, password, callback) {
  const BASE_URL = Constants.remoteServer + '/api/fp/login'
  const request = {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.elitex-v1+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_name: username, password: password})
  }

  try {
    const response = await fetch(BASE_URL, request);
    const json = await response.json();
    if (response.ok) {
      Constants.setToken(json.access_token)
      return callback(null);
    } else {
      console.log(json);
      return callback(new Error('Unknown error!'));
    }
  } catch (error) {
    return callback(new Error('Invalid Username or password!'));
  }

}