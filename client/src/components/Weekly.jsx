import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';

const listStyles = {
  display: 'inline-block',
  margin: '16px 16px 8px 16px',
};

const buttonStyles = {
  margin: 16
};
const iconStyles = {
  margin: '8px 16px 8px 16px',
};

const LeftArrow = (props) => (
  <SvgIcon {...props}> 
    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
      <path d="M0-.5h24v24H0z" fill="none"/>
    </svg>   
  </SvgIcon>
)

const RightArrow = (props) => (
  <SvgIcon {...props}> 
    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
        <path d="M0-.25h24v24H0z" fill="none"/>
    </svg>  
  </SvgIcon>
)


class Weekly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      week: [
        {name: 'Monday', total: 4}, 
        {name: 'Tuesday', total: 5},
        {name: 'Wednesday', total: 12},
        {name: 'Thursday', total: 0},
        {name: 'Friday', total: 33},
        {name: 'Saturday', total: 2},
        {name: 'Sunday', total: 0}
      ]
    }
  }
  
  render (props) {
    return (
    
        <div className="week-view-container">
          <Paper style={listStyles}>
            
            <div className="week-title"> <h3>WEEKLY TASKS</h3></div>
           
           
            <div className="week-list">       
              
              <Paper style={listStyles}>
                <Menu>               
                  { this.state.week.map( (day, index) =>
                    <MenuItem key={index} primaryText={day.name} />                 
                    )
                  }               
                </Menu>
              </Paper>
            
    
              <Paper style={listStyles}>
                <Menu>  
                  { this.state.week.map( (day, index) => 
                    <MenuItem key={index} primaryText={`${day.total} Tasks`} />
                    )             
                  }
                  
                </Menu>
              </Paper>
 
          </div>
          
          
          <div className="week-selectors">            
            <RaisedButton icon={<LeftArrow style={iconStyles} />} style={styleBtn} />
            <RaisedButton label={<RightArrow style={iconStyles} />} style={styleBtn} />       
          </div>
          
          
          
        </Paper>
       </div>  
      
    )
  }
  
}

export default Weekly;
