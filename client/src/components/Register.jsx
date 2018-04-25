import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import LoginView from './Login.jsx'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'



class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isActive: true
    }
    this.style = {
      display: this.state.isActive ? 'flex' : 'none'
    }
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({isActive: false})
  }


  render() {
    return (
      <div className="login-wrap" style={{display: this.state.isActive ? 'flex' : 'none'}}>
        <div className="container login-container">
        <button className="close-button-login" onClick={this.handleClose}><Link to="/">
      <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
       </Link></button>
          <div class="col-sm-6 col-sm-offset-3">
              <h1><span className="fa fa-sign-in"></span> Register</h1>
              <form action="/signup" method="post">
                  <div className="form-group">
                      <label>Email</label>
                      <input type="text" className="form-control" name="email"/>
                  </div>
                  <div className="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control" name="password"/>
                  </div>
                  <button type="submit" className="btn btn-warning btn-lg">Login</button>
              </form>
              <hr/>
                <p>Already have an account?
                  <Link to="login"> Login</Link>
                </p>
              <p>Or go <a href="/">home</a>.</p>
          </div>
        </div>
      </div>
      
    )
  }
}

export default Register;