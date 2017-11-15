import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loadAllUsers } from '../../actions/users';
import { loadAllOrders } from '../../actions/orders';
import { loadAllDepartments } from '../../actions/departments';
import Plan from '../plan';
import Dependencies from '../dependencies';
import Login from '../login';
import Search from '../orders';
import Cutting from '../cutting';
import '../style/index.css';
import Header from '../header';

const isAuthenticated = () => !!localStorage.getItem('ppotoken')

const PrivateRoute = ({
  component: Component,
  ...rest
}) => (
    <Route {...rest} render={props => (isAuthenticated()
      ? (<Component {...props} />)
      : (<Redirect to={{
        pathname: '/',
        state: {
          from: props.location
        }
      }} />))} />
  )

class App extends React.Component {
  componentDidMount() {
    this.props.loadDepartments();
    this.props.loadOrders();
    this.props.loadAllUsers();
  }

  render() {
    return (
      <div>
        <main>
          <Header />
          <div className="panel-body">
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/orders" component={Search} />
            <PrivateRoute exact path="/orders/:id/dependencies" component={Dependencies} />
            <PrivateRoute exact path="/departments/:id/plan" component={Plan} />
            <PrivateRoute exact path="/cutting" component={Cutting} />
          </div>
        </main>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    route: state.routing
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    loadOrders: () => dispatch(loadAllOrders()),
    loadDepartments: () => dispatch(loadAllDepartments()),
    loadAllUsers: () => dispatch(loadAllUsers())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
