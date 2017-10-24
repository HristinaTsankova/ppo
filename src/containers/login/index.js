import React from 'react'
import '../style/index.css'
import logo from '../image/capasca-logo.png'
import {Redirect} from 'react-router-dom';

const saveToken = token => localStorage.setItem('ppotoken', token)

export default class Login extends React.Component {
  
  state = {
    redirectToReferrer: false
  }

  async submit(e) {

    e.preventDefault()

    const BASE_URL = 'http://178.62.112.203/api/fp/login'
    const {username, password} = this.refs

    const request = {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.elitex-v1+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_name: username.value, password: password.value})
    }

    const response = await fetch(BASE_URL, request)
    const json = await response.json()
    if (response.ok) {
      saveToken(json.access_token)
      this.setState({ redirectToReferrer: true })
    } else {
      alert(json.errors.join('\n'))
    }
  }

  render() {
    
    const { from } = this.props.location.state || { from: { pathname: '/orders' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
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
          <div className="col-md-5 login-form">
            <form onSubmit={this.submit.bind(this)}>
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
