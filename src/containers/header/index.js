import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../../actions/login';

class Header extends React.Component{
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }
  
  onLogoutClick() {
    this.props.logout();
    this.props.history.push('/')
  }

  render() {
    if (this.props.login.isLoginSuccess === false) {
      return null;
    }
    
    return(
      <nav className="navbar navbar-inverse navbar-static-top">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/orders">Процеси и подов план</Link></li>
              <li><Link to="/cutting">Кроялно</Link></li>
            </ul>
            <div className="navbar-form navbar-right">
              <button className="btn btn-danger exit" onClick={this.onLogoutClick}>Изход</button>
            </div>

          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
