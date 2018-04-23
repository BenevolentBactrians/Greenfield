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
      currentWeekDateRange: [],
      currentWeekData: []
    }
    this.handlePreviousWeekButton = this.handlePreviousWeekButton.bind(this);
    this.handleNextWeekButton = this.handleNextWeekButton.bind(this);
    this.getTasksByDay = this.getTasksByDay.bind(this);
    this.initializeData = this.initializeData.bind(this);
    // TODO bind other functions ??
  }

  
  componentDidMount() {
    console.log('weekly component did mount....');  
    this.initializeData()
  }
  
    // initialize the current week view data (promise)
    //   get the date
    //   set current week date range
    //   get tasks by day for date range (7 days)
    //   iterate over the data and populate the view

  initializeData () {
    var context = this;
    
    console.log('initializing data...')
      var initializeDataPROMISE = new Promise ( (resolve, reject) => {
      context.setCurrentWeekDateRange();
      resolve()
    }) 
    
    initializeDataPROMISE
    .then( (data) => {
      context.state.currentWeekDateRange.forEach( (date) => {
        context.getTasksByDay(date);     
      })
    })
    .catch ( (error) =>{
      console.log(error);
    })
 } 
  
  
  setCurrentWeekDateRange() {
    console.log('setCurrentWeekDateRange...')
    var date = new Date (this.state.currentDate.getTime())
    var startDate = date;
    startDate.setHours(0,0,0,0);
    var dateRange = [startDate];
    
    for (var i = 0; i < 6; i++) {
      var nextDate = new Date(dateRange[dateRange.length - 1].getTime() + 1 * 86400000); 
      dateRange.push(nextDate);
    }
    this.setState({currentWeekDateRange: dateRange})  
  }
  
  
  getTasksByDay (date) {
    console.log('getTasksByDay......')
    
    var context = this;
    
    var userId = this.props.userId;
    var path = `/task/${userId}/${date}`;
    
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
    })
    .catch ( (error) => {
      console.log(error)
    })
  }
  
  
  
  formatCurrentWeek () {  
    console.log('formatCurrentWeek...')
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

    var newDate = new Date (this.state.currentDate.getTime() - 7 * 86400000);
    // newDate.setHours(0,0,0,0);
    console.log('old date: ',  this.state.currentDate);
    console.log('new date: ', newDate);
    
    this.setState({currentWeekData: []});
    this.setState({currentDate: newDate});
    this.initializeData();
  }
  
  
  handleNextWeekButton () {
    console.log('handleNextWeekButton...');
    
    var newDate = new Date (this.state.currentDate.getTime() + 7 * 86400000);
    // newDate.setHours(0,0,0,0);
    console.log('old date: ',  this.state.currentDate);
    console.log('new date: ', newDate);
    
    this.setState({currentWeekData: []});
    this.setState({currentDate: newDate});
    this.initializeData();
  }
  
   
  
  render (props) { 
    return (

          <Paper style={listStyles} className="week-view-container paper">
            
            <div className="week-title"> <h3>WEEKLY TASKS</h3></div>
           
           
            <div className="week-list">       
              
              <Paper style={listStyles}>


                <Menu width={320}>               

                  { this.state.currentWeekData.map( (day, index) =>

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



// initialize the following state if not logged in ?? TODO
      // currentWeekData: [
      //   {date: 'Monday', tasks: []},
      //   {date: 'Tuesday', tasks: []},
      //   {date: 'Wednesday', tasks: []},
      //   {date: 'Thursday', tasks: []},
      //   {date: 'Friday', tasks: []},
      //   {date: 'Saturday', tasks: []},
      //   {date: 'Sunday', tasks: []}
      // ]


