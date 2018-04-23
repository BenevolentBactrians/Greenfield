import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import moment from 'moment';

const WeeklyTaskEntry = (props) => (
  
  <MenuItem  
    primaryText={props.day.name} 
    secondaryText={`${props.day.total} Task(s)`} 
    />
)

export default WeeklyTaskEntry;