import React, {Component} from 'react';
import LoginView from './Login.jsx';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { fullWhite } from 'material-ui/styles/colors';
import Register from './Register.jsx'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton style={{color: 'white'}} label="Login" />
    );
  }
}

const Logged = (props) => {
  const handleSignOut = () => {
    axios.get('/signout')
  }
  return (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton><MoreVertIcon color={fullWhite} /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Refresh" />
      <MenuItem primaryText="Help" />
      <MenuItem primaryText="Sign out" onClick={handleSignOut} />
    </IconMenu>
  )
};

Logged.muiName = 'IconMenu';

class AppHeader extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
    return (
      <div className="app-header">
          <div className="nav-left"> LEFT  </div>
          <div className="nav-center"> <h1> TITLE </h1> </div>
          <div className="nav-right"> {this.props.logged ? <Logged /> : <Link to="/login"> <Login /> </Link> } </div>
          <Route exact path="/signup" component={Register}/>
          <Route exact path="/login" component={LoginView}/>
      </div>
    )
  }

}

export default AppHeader;


