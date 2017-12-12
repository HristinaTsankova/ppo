import Constants from '../utils/constants';
import { LOAD_GENERAL_ERROR } from '../reducers/errors';

export const LOAD_EARNINGS_SUCCESS = 'LOAD_EARNINGS_SUCCESS';

export function loadEarningsByIds(ids) {
  return (dispatch) => {
    callEarningsLiveApi(ids, (data, error) => {
      if (!error) {
        dispatch(loadEarningsSuccess(data));
      } else {
        dispatch(loadEarningsError(error));
      }
    });
  }
}

function loadEarningsSuccess(data) {
  return {
    type: LOAD_EARNINGS_SUCCESS,
    data: data
  };
}

function loadEarningsError(isLoadError) {
  return {
    type: LOAD_GENERAL_ERROR,
    isError: isLoadError
  };
}

export async function callEarningsLiveApi(ids, callback) {
  const BASE_URL = Constants.remoteServer + '/api/fp/earnings/by_order_ids';
  const request = {
    method: 'POST',
    headers: Constants.headers,
    body: JSON.stringify({"order_ids": ids})
  }

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
    let msg = 'Неуспешен опит да заредим данните!';
    return callback({}, new Error(msg));
  }
}
