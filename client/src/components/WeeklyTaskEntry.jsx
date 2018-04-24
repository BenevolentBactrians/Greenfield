import React from 'react';
import MenuItem from 'material-ui/MenuItem';
// import axios from 'axios';
// import moment from 'moment';

class WeeklyTaskEntry extends React.Component {
  constructor (props) {
    super(props);
    this.state = {}
  }
  
  render (props) {
  

    return ( 
      <MenuItem  
        primaryText={this.props.day.date} 
        secondaryText={`${this.props.day.count} Task(s)`} 
        onClick={(e)=> console.log('clicked ', this.props.day)}
        />
    )
  }
  
}



export default WeeklyTaskEntry;