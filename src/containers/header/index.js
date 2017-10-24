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
                <nav className="navbar navbar-dark bg-dark">
                    <div className="row">
                        <div className="col-md-6 col-sm-4 links">
                            <a className="nav-link" href="/orders">Процеси и подов план</a>
                            <a className="nav-link" href="/cutting">Кроялна</a>
                        </div>
                        <div className="col-md-2 col-sm-2 logout">
                            <button className="btn btn-danger exit" onClick={this.onLogoutClick}>Изход</button>
                        </div>
                    </div>
                    
                </nav>
                
       
        )
    }
}
export default withRouter (Header);