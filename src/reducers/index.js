import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import login from './login';
import users from './users';
import departments from './departments';


export default combineReducers({
  // routing: routerReducer,
  login: login,
  users: users,
  departments: departments
})