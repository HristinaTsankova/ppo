import Constants from '../utils/constants';

export const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS';
export const LOAD_ORDERS_ERROR = 'LOAD_ORDERS_ERROR';

export const LOAD_SINGLE_ORDER_SUCCESS = 'LOAD_SINGLE_ORDER_SUCCESS';
export const LOAD_SINGLE_ORDER_ERROR = 'LOAD_SINGLE_ORDER_ERROR';

export function saveParentsData(order) {
  return dispatch => {
    callOrdersSaveApi(order, (data, error) => {
      if (!error) {
        dispatch(loadSingleOrderSuccess(data));
      } else {
        dispatch(loadSingleOrderError(error));
      }
    });
  }
}

export function loadAllOrders() {
  return dispatch => {
    dispatch(loadOrdersSuccess({}));
    dispatch(loadOrdersError(null));

    callOrdersApi(null, (data, error) => {
      if (!error) {
        dispatch(loadOrdersSuccess(data));
      } else {
        dispatch(loadOrdersError(error));
      }
    });
  }
}

export function loadOrderById(orderId) {
  return dispatch => {
    dispatch(loadSingleOrderSuccess({}));
    dispatch(loadSingleOrderError(null));

    callOrdersApi(orderId, (data, error) => {
      if (!error) {
        dispatch(loadSingleOrderSuccess(data));
      } else {
        dispatch(loadSingleOrderError(error));
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
    type: LOAD_ORDERS_ERROR,
    isListLoadError: isLoadError
  };
}

function loadSingleOrderSuccess(data) {
  return {
    type: LOAD_SINGLE_ORDER_SUCCESS,
    order: data
  };
}

function loadSingleOrderError(isLoadError) {
  return {
    type: LOAD_SINGLE_ORDER_ERROR,
    isLoadError: isLoadError
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
      return callback({}, new Error('Unknown error!'));
    }
  } catch (error) {
    return callback({}, new Error('Unable to load order/s!'));
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
      return callback({}, new Error('Unknown error!'));
    }
  } catch (error) {
    return callback({}, new Error('Unable to load order/s!'));
  }
}