import React from 'react';
import {withRouter} from "react-router-dom"

const deleteToken = () => localStorage.removeItem('ppotoken')

class Header extends React.Component{
    constructor() {
        super()
        this.onLogoutClick = this.onLogoutClick.bind(this)
//        this.onOrderClick = this.onOrderClick.bind(this)
//        this.onCuttingClick = this.onCuttingClick.bind(this)
    }
    onLogoutClick() {
        deleteToken()
        this.props.history.push('/')
    }
//    onOrderClick() {
//        this.props.history.push('/orders')
//    }
//    onCuttingClick() {
//        this.props.history.push('/cutting')
//    }
    render() {
        return(
            <nav className="navbar navbar-inverse">
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
export default withRouter (Header);
