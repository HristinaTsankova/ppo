import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Login from '../login'

const App = () => (
  <div>
    <header>
        <Link to="/">Login</Link>
    </header>

    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/home" component={Home} />
    </main>
  </div>
)

export default App