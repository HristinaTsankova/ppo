import Constants from '../utils/constants';
import { LOAD_GENERAL_ERROR } from '../reducers/errors';

export const LOAD_DEPARTMENT_FLOORS_SUCCESS = 'LOAD_DEPARTMENT_FLOORS_SUCCESS';
export const LOAD_SINGLE_FLOOR_SUCCESS = 'LOAD_SINGLE_FLOOR_SUCCESS';

export function saveFloorData(data) {
  return (dispatch, getState) => {
    let floor = getState().floor.floor;
    floor.payload.data = data;
    callFloorsSaveApi(floor, (data, error) => {
      if (!error) {
        dispatch(loadSingleFloorSuccess(data));
      } else {
        dispatch(loadFloorsError(error));
      }
    });
  };
}

export function loadAllFloors() {
  return (dispatch, getState) => {
    let dept = 'by_department_id/' + getState().query.department;
    callFloorsApi(dept, (data, error) => {
      if (!error) {
        if (data.length > 0) {
          let floorId = data[data.length - 1].id;
          dispatch(loadFloorById(floorId));
        } else {
          dispatch(initFloorData());
        }
        dispatch(loadFloorsSuccess(data));
      } else {
        dispatch(loadFloorsError(error));
      }
    });
  };
}

export function loadFloorById(floorId) {
  return dispatch => {
    callFloorsApi(floorId, (data, error) => {
      if (!error) {
        dispatch(loadSingleFloorSuccess(data));
      } else {
        dispatch(loadFloorsError(error));
      }
    });
  }
}

function initFloorData() {
  return (dispatch, getState) => {
    let dept = getState().query.department;

    let floor = {
      "department_id": dept,
      "status": "draft",
      "name": Date().toString(),
      "payload": {
        "data": [[{}]],
        "description": "..."
      }
    }

    callFloorsCreateApi(floor, (data, error) => {
      if (!error) {
        dispatch(loadSingleFloorSuccess(data));
      } else {
        dispatch(loadFloorsError(error));
      }
    });
  }
}

function loadFloorsSuccess(data) {
  return {
    type: LOAD_DEPARTMENT_FLOORS_SUCCESS,
    list: data
  };
}

function loadFloorsError(isLoadError) {
  return {
    type: LOAD_GENERAL_ERROR,
    isError: isLoadError
  };
}

function loadSingleFloorSuccess(data) {
  return {
    type: LOAD_SINGLE_FLOOR_SUCCESS,
    floor: data
  };
}

/**
 * API call do get data from the server
 * 
 * @param {*} floor 
 * @param {*} callback 
 */
async function callFloorsApi(floor, callback) {
  const BASE_URL = Constants.remoteServer + '/api/fp/floor_plans' + ((floor != null) ? '/' + floor : '');
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
    return callback({}, new Error('Неуспешен опит да заредим подовия план!'));
  }
}

/**
 * API call to save data for existing floor plan
 * 
 * @param {*} floor 
 * @param {*} callback 
 */
async function callFloorsSaveApi(floor, callback) {
  const BASE_URL = Constants.remoteServer + '/api/fp/floor_plans/' + floor.id;
  const request = {
    method: 'PUT',
    headers: Constants.headers,
    body: JSON.stringify(floor)
  };

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
    return callback({}, new Error('Неуспешен опит да запишем промените в подовия план!'));
  }
}

/**
 * API call to save new floor plan
 * 
 * @param {*} floor 
 * @param {*} callback 
 */
async function callFloorsCreateApi(floor, callback) {
  const BASE_URL = Constants.remoteServer + '/api/fp/floor_plans';
  const request = {
    method: 'POST',
    headers: Constants.headers,
    body: JSON.stringify(floor)
  };

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
    return callback({}, new Error('Неуспешен опит да създадем подов план!'));
  }
}