import Constants from '../utils/constants';
import { LOAD_GENERAL_ERROR } from '../reducers/errors';

export const CACHE_SINGLE_ORDER = 'CACHE_SINGLE_ORDER';
export const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS';
export const LOAD_SINGLE_ORDER_SUCCESS = 'LOAD_SINGLE_ORDER_SUCCESS';

export function saveParentsData(order) {
  return dispatch => {
    callOrdersSaveApi(order, (data, error) => {
      if (!error) {
        dispatch(loadSingleOrderSuccess(data));
      } else {
        dispatch(loadOrdersError(error));
      }
    });
  }
}

export function loadAllOrders() {
  return dispatch => {
    callOrdersApi(null, (data, error) => {
      if (!error) {
        dispatch(loadOrdersSuccess(data));
      } else {
        dispatch(loadOrdersError(error));
      }
    });
  }
}

export function loadOrderById(orderId, selected) {
  selected = (selected === undefined || selected === null) ? orderId : selected;
  return (dispatch, getState) => {
    let cache = getState().orders.cache;
    if (cache[orderId] !== undefined) {
      if (selected === orderId) {
        dispatch(loadSingleOrderSuccess(cache[orderId]));
      }
      return;
    }
    callOrdersApi(orderId, (data, error) => {
      if (!error) {
        if (selected === orderId) {
          dispatch(loadSingleOrderSuccess(data));
        }
        dispatch(cacheSingleOrderSuccess(data));
      } else {
        dispatch(loadOrdersError(error));
      }
    });
  }
}

function loadOrdersSuccess(data) {
  return {
    type: LOAD_ORDERS_SUCCESS,
    list: data
  };
}

function loadOrdersError(isLoadError) {
  return {
    type: LOAD_GENERAL_ERROR,
    isError: isLoadError
  };
}

function loadSingleOrderSuccess(data) {
  return {
    type: LOAD_SINGLE_ORDER_SUCCESS,
    order: data
  };
}

function cacheSingleOrderSuccess(data) {
  return {
    type: CACHE_SINGLE_ORDER,
    order: data
  };
}

async function callOrdersApi(order, callback) {
  const BASE_URL = Constants.remoteServer + '/api/fp/orders' + ((order != null) ? '/' + order : '');
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
    let msg = 'Неуспешен опит да заредим поръчките!';
    if (order !== null) {
      msg = 'Неуспешен опит да заредим поръчката!';
    }
    return callback({}, new Error(msg));
  }
}

async function callOrdersSaveApi(order, callback) {
  const BASE_URL = Constants.remoteServer + '/api/fp/orders/' + order.id;
  const request = {
    method: 'PUT',
    headers: Constants.headers,
    body: JSON.stringify(order)
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
    return callback({}, new Error('Неуспешен опит да запазим промените на поръчката!'));
  }
}