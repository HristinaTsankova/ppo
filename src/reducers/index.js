import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import departments from './departments';
import login from './login';
import users from './users';
import query from './query';
import orders from './orders';


export default combineReducers({
  routing: routerReducer,
  departments: departments,
  login: login,
  users: users,
  query: query,
  orders: orders
})