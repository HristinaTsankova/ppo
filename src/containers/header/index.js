import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"

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
    return(
      <nav className="navbar navbar-inverse navbar-static-top">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a href="/orders">Процеси и подов план</a></li>
              <li><a href="/cutting">Кроялно</a></li>
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
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
