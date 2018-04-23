import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';
import WeeklyTaskEntry from './WeeklyTaskEntry.jsx'

const listStyles = {
  display: 'inline-block',
  margin: '8px 8px 8px 8px'
};

const buttonStyles = {
  margin: 16
};
const iconStyles = {
  margin: '8px 16px 8px 16px'
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
    }
  }
  
  render (props) {
    return (
    
        // <div className="week-view-container">
          <Paper style={listStyles} className="week-view-container">
            
            <div className="week-title"> <h3>WEEKLY TASKS</h3></div>
           
           
            <div className="week-list">       
              
              <Paper style={listStyles}>
                <Menu width={320}>               
                  { this.props.week.map( (day, index) =>
                    <WeeklyTaskEntry day={day} key={index} />                 
                    )
                  }               
                </Menu>
              </Paper>
 
          </div>
          
          
          <div className="week-selectors">            
            <RaisedButton icon={<LeftArrow style={iconStyles} />} style={buttonStyles} />
            <RaisedButton label={<RightArrow style={iconStyles} />} style={buttonStyles} />       
          </div>
          
          
          
        </Paper>
       // </div>  
      
    )
  }
  
}

export default Weekly;
