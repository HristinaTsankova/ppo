import React from 'react';
import '../style/index.css';
import logo from '../image/capasca-logo.png';


export default class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            user_name: '',
            password:'',
            
        }
    }

    submit() {
        console.log('state', this.state);
        const BASE_URL='http://178.62.112.203/api/fp/login';
        const params = {
            'grant_type': 'password',
            'username': this.state.user_name,
            'password': this.state.password,
        };
        const formData = new FormData();
        for (let p in params) {
            formData.append(p, params[p]);
        }
        const headers = new Headers({
            //'Access': 'application/vnd.elitex-v1+json',
            'Content-Type': 'application/json',
            //'Authorization': "access_token=-fKJ0-fsGTCwNcyDg1BMUQ" 
        });
        const body = {
            user_name: '1011',
            password: '1234'
        };
        const request = {
            method: 'POST',
            headers: headers,
            //mode: 'no-cors',
            body: JSON.stringify(body)
            
        };
        fetch(BASE_URL, request)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.access_token)
                localStorage.setItem('ppotoken', res.access_token)
            })
            .catch((error) => {
                console.warn(error);
            });
        console.log('all done');
    }
    login() {
        let user_name = this.refs.username.value;
        let password = this.refs.password.value;
        
        
        if(user_name !== '1011' || password !== '1234') {
            alert('Sorry, wrong credentials');
        } else {
            this.props.history.push('/orders');
       }

    }

    render() {
        return (
            <div className="container">
                <div className='row login'>
                    <div>
                         <img src={logo} alt='' className='logo'/>
                    </div>
                    <div className="col-md-5 login-form">
                <form method="POST" >
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                        <input ref="username" type="text" className='form-control' name='username' id="username" placeholder="Username" onChange={event => this.setState({user_name: event.target.value})}
                            onKeyPress={
                                event => {
                            if (event.key === 'Enter') {
                                this.submit()
                            } }}
                            />
                    </div>
                    <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                <input ref="password" type="password" className='form-control' name='password' id="password" placeholder="Password"
                onChange = {event => {
                    console.log(event.target.value)
                    this.setState({password: event.target.value})
                }}
                onKeyPress = {
                    event => {
                        if (event.key === 'Enter') {
                            this.submit()
                        }
                    }}/>
                    </div>
                    </form>
                    </div>
                <button type="submit" onClick={() => this.login()} className='btn btn-success'>Login</button>
                </div>
            </div>
        )
    }
}