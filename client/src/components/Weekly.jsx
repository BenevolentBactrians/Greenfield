import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import moment from 'moment'; 
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';
import WeeklyTaskEntry from './WeeklyTaskEntry.jsx';

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
      currentDate: new Date(),
      currentWeekDateRange: {},
      currentWeekData: [],
      currentWeekFormatted: this.props.week
    }
    this.handlePreviousWeekButton = this.handlePreviousWeekButton.bind(this);
    this.handleNextWeekButton = this.handleNextWeekButton.bind(this);
    this.getTasksByDay = this.getTasksByDay.bind(this);
  }
  
  componentWillMount () {
    
  }
  
  componentWillReceiveProps() {
    
  }
  
  
  componentDidMount() {
    console.log('weekly component did mount....'); 
    this.setCurrentWeekDateRange();
    this.getCurrentWeekTaskCount();  
  }
  
  setCurrentWeekDateRange() {
    var date = new Date (this.state.currentDate.getTime())
    var startDate = date;
    startDate.setHours(0,0,0,0);
      
    var endDate = new Date(startDate.getTime() + 6 * 86400000); 
    
    var dateRange = {
      start: startDate,
      end: endDate
    }; 
    this.setState({currentWeekDateRange: dateRange})  
  }
  
  
  getCurrentWeekTaskCount () {
    console.log('getCurrentWeekTaskCount.....')
      
    // TODO  get one days tasks TEMPORARY
    this.getTasksByDay ();   
  }
  
  
  getTasksByDay () {
    console.log('getTasksByDay............')
    
    var context = this;
    
    // var date = this.state.currentDate.toISOString();
    var date = this.state.currentDate;  // set time  to 00000 ????? TODO
    var userId = this.props.userId;
    var path = `/task/${userId}/${date}`;

    console.log('path: ', path);
    
    axios.get( path )
    .then ( (results) => {
      return results;
    })
    .then ( (results) => {
      var updatedCurrentWeekData = context.state.currentWeekData;
      var tasksByDay = {
        date: date,
        tasks: results.data
      }
      updatedCurrentWeekData.push(tasksByDay);
      context.setState({currentWeekData: updatedCurrentWeekData});
      console.log('currentWeekData: ', context.state.currentWeekData);
    })
    .catch ( (error) => {
      console.log(error)
    })
  }
  
  
  
  formatCurrentWeek () {  
    var formattedWeek = this.currentWeekData.map ( (day) => {
      var formattedDay = {
        date: day.date, 
        count: day.tasks.length
      }
      return formattedDay
    })
    this.setState({currentWeekFormatted: formattedWeek})   
  }
  
  
  handlePreviousWeekButton () {
    console.log('handlePreviousWeekButton...');
    
  }
  
  handleNextWeekButton () {
    console.log('handleNextWeekButton...');
    
  }
  
  
  
  
  
  render (props) {
    
    // console.log('Weekly render props: ', this.props);
    // console.log('Weekly render state: ', this.state);
    return (

          <Paper style={listStyles} className="week-view-container paper">
            
            <div className="week-title"> <h3>WEEKLY TASKS</h3></div>
           
           
            <div className="week-list">       
              
              <Paper style={listStyles}>

                <Menu width={320}>               

                  { this.state.currentWeekFormatted.map( (day, index) =>
                    <WeeklyTaskEntry day={day} key={index} />                 
                    )
                  }               
                </Menu>
              </Paper>
 
          </div>
          
          
          <div className="week-selectors">            
            <RaisedButton 
              icon={<LeftArrow style={iconStyles} />} 
              style={buttonStyles} 
              onClick={()=> this.handlePreviousWeekButton()}
              />
            <RaisedButton 
              label={<RightArrow style={iconStyles} />} 
              style={buttonStyles} 
              onClick={()=> this.handleNextWeekButton()}
              />       
          </div>
          
          
          
        </Paper>
      
    )
  }
  
}

export default Weekly;
