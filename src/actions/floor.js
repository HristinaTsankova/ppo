import Constants from '../utils/constants';
import { LOAD_GENERAL_ERROR } from '../reducers/errors';

export const LOAD_DEPARTMENT_FLOORS_SUCCESS = 'LOAD_DEPARTMENT_FLOORS_SUCCESS';
export const LOAD_SINGLE_FLOOR_SUCCESS = 'LOAD_SINGLE_FLOOR_SUCCESS';

export function saveFloor(floor) {
  return (dispatch) => {
    callFloorsSaveApi(floor, (data, error) => {
      if (!error) {
        dispatch(loadSingleFloorSuccess(data));
      } else {
        dispatch(loadFloorsError(error));
      }
    });
  };
}

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

export function loadAllFloors(id, callback) {
  return (dispatch, getState) => {
    const deptId = (id !== undefined) ? id : getState().query.department;
    const dept = 'by_department_id/' + deptId;
    callFloorsApi(dept, (data, error) => {
      if (!error) {
        if (data.length > 0) {
          const floorId = data[data.length - 1].id;
          dispatch(loadFloorById(floorId, callback));
        } else {
          dispatch(initFloorData(deptId));
        }
        dispatch(loadFloorsSuccess(data));
      } else {
        dispatch(loadFloorsError(error));
      }
    });
  };
}

export function loadFloorById(floorId, callback) {
  return dispatch => {
    callFloorsApi(floorId, (data, error) => {
      if (!error) {
        if (callback !== undefined) {
          callback(data);
        } else {
          dispatch(loadSingleFloorSuccess(data));
        }
      } else {
        dispatch(loadFloorsError(error));
      }
    });
  }
}

function initFloorData(id) {
  return (dispatch, getState) => {
    const dept = (id !== undefined) ? id : getState().query.department;
    
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