import React from 'react';
import { Route } from 'react-router-dom';

import Plan from '../plan';
import Dependencies from '../dependencies';
import Login from '../login';
import Orders from '../orders';
import Cutting from '../cutting';
import '../style/index.css';


// const loggedIn = () => true

// const authenticated = component => () =>
//   loggedIn()
//     ? (component)
//     : (<Redirect to="/" />)

const App = () => (
  
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/orders" component={Orders} /> 
      <Route exact path="/orders/:id/dependencies" component={Dependencies} />
      <Route exact path="/orders/:id/plan" component={Plan} />
      <Route exact path="/cutting" component={Cutting}/>
    </main>
  </div>
)


export default App