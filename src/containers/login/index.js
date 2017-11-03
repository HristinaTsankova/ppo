import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../image/capasca-logo.png'
import {Redirect} from 'react-router-dom';
import { isLoggedIn, login } from '../../actions/login';

import '../style/index.css';
import '../style/debug.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault()
    let { username, password } = this.refs;
    this.props.login(username.value, password.value);
  }

  render() {
    this.props.isLoggedIn();
    let {isLoginSuccess, loginError} = this.props;
    let { from } = this.props.location.state || { from: { pathname: '/orders' } }
    if (isLoginSuccess) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div className="container">
        <div className='row login'>
          <div>
            <img src={logo} alt='' className='logo'/>
          </div>
          <div className="error-message">{ loginError && <div>{loginError.message}</div> }</div>
          <div className="col-md-5 login-form">
            <form onSubmit={this.onSubmit}>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-user"></i>
                </span>
                <input ref="username" type="text" className='form-control' name='username' id="username" placeholder="Username"/>
              </div>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-lock"></i>
                </span>
                <input ref="password" type="password" className='form-control' name='password' id="password" placeholder="Password"/>
              </div>
              <button type="submit" className='btn btn-success log'>Login</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.login.isLoginPending,
    isLoginSuccess: state.login.isLoginSuccess,
    loginError: state.login.loginError,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    login: (username, password) => dispatch(login(username, password)),
    isLoggedIn: () => dispatch(isLoggedIn())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);