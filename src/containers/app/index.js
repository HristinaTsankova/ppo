import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Plan from '../plan';
import Dependencies from '../dependencies';
import Login from '../login';
import Orders from '../orders';
import Cutting from '../cutting';
import '../style/index.css';

const isAuthenticated = () => !!localStorage.getItem('ppotoken')

const PrivateRoute = ({
  component: Component,
  ...rest
}) => (
  <Route {...rest} render={props => (isAuthenticated()
    ? (<Component {...props}/>)
    : (<Redirect to={{
      pathname: '/',
      state: {
        from: props.location
      }
    }}/>))}/>
)

const App = () => (

  <div>
    <main>
      <Route exact path="/" component={Login}/>
      <PrivateRoute exact path="/orders" component={Orders}/>
      <PrivateRoute exact path="/orders/:id/dependencies" component={Dependencies}/>
      <PrivateRoute exact path="/orders/:id/plan" component={Plan}/>
      <PrivateRoute exact path="/cutting" component={Cutting}/>
    </main>
  </div>
)

export default App