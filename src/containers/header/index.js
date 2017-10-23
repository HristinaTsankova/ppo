import React from 'react';
import {withRouter} from "react-router-dom"

const deleteToken = token => localStorage.setItem('ppotoken', token)

class Header extends React.Component{
    constructor() {
        super()
        this.onLogoutClick = this.onLogoutClick.bind(this)
        this.onOrderClick = this.onOrderClick.bind(this)
        this.onCuttingClick = this.onCuttingClick.bind(this)
    }
    onLogoutClick() {
        this.props.history.push('/')
        deleteToken('undefined')
    }
    onOrderClick() {
        this.props.history.push('/orders')
    }
    onCuttingClick() {
        this.props.history.push('/cutting')
    }
    render() {
        return(
                <div className="container-fluid header">
                    <div className="row">
                        <div className="col-md-6 col-sm-4 links">
                            <button className="btn btn-default" onClick={this.onOrderClick}>Поръчки</button>
                            <button className="btn btn-default" onClick ={this.onCuttingClick}>Кроялна</button>
                        </div>
                        <div className="col-md-2 col-sm-2 logout">
                            <button className="btn btn-danger exit" onClick={this.onLogoutClick}>Изход</button>
                        </div>
                    </div>
                    
                </div>
                
       
        )
    }
}
export default withRouter (Header);