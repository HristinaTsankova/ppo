import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import departments from './departments';
import login from './login';
import users from './users';
import query from './query';
import orders from './orders';
import floor from './floor';
import dialog from './dialog';


export default combineReducers({
  routing: routerReducer,
  departments: departments,
  login: login,
  users: users,
  query: query,
  orders: orders,
  floor: floor,
  dialog: dialog
})