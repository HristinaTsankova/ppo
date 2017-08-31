import React from 'react';

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
        const request = {
            method: 'POST',
            headers: headers,
            //mode: 'no-cors',
            body: JSON.stringify({"user_name": "1011", "password": "1234"})
            
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

    render() {
        return (
            <div>
                <div className='col-sm-12'>
        
                <input ref="username" type="text" name='username' id="username" placeholder="Email" onChange={event => this.setState({user_name: event.target.value})}
                onKeyPress={
                    event => {
                        if (event.key === 'Enter') {
                            this.submit()
                        } }}/>
                <input ref="password" type="password" name='password' id="password" placeholder="Password"
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
                <button type="submit" onClick={() => this.submit()}>Login</button>
                </div>
            </div>
        )
    }
}