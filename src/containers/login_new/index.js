import React from 'react';
import '../style/index.css';
import logo from '../image/capasca-logo.png';
import Constants from '../../utils/constants';


export default class Login extends React.Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        }
    onSubmit() {
        fetch(Constants.remoteServer + '/api/fp/login', {
            method: 'POST',
            headers: {
                'Access': 'application/vnd.elitex-v1+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_name: '1011',
                password: '1234'
            })
        })
    }
    

    
    render() {
        return (
            <div className="container">
                <div className="row login">
                    <div>
                         <img src={logo} alt='' className='logo'/>
                    </div>
                    <div className="col-md-5 login-form">
                        <form  >
                            <div className=" input-group">
                                <span className ="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                <input className ="form-control" id="user" type="text" ref="user_name"/>
                            </div>
                            <div className="input-group">
                                <span className ="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                <input className ="form-control" id="user" type="password" ref="password"/>
                            </div>
                            <button type="submit" className="btn btn-success" onClick={this.onSubmit} >Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}