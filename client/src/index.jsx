import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider, getMuiTheme} from 'material-ui';
// import SvgIcon from 'material-ui/SvgIcon';
import App from './components/App.jsx'


ReactDOM.render(<MuiThemeProvider><div><App/></div></MuiThemeProvider>, document.getElementById('app'));

