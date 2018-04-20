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
      weekList: [
        {date: 'Monday', taskCount: 4}, 
        {date: 'Tuesday', taskCount: 5},
        {date: 'Wednesday', taskCount: 12},
        {date: 'Thursday', taskCount: 0},
        {date: 'Friday', taskCount: 33},
        {date: 'Saturday', taskCount: 2},
        {date: 'Sunday', taskCount: 0}
      ],
      currentDate: Date(),
      currentWeekTasks: [] 
    }
  }
  // on component did mount
  //   setCurrentDate
  //   getCurrentWeekTasks
  //   formatWeekList
  
  componentDidMount () {
    console.log('componenetDidMount..')
    this.setCurrentDate();
    this.getCurrentWeekTasks(); // TODO add user ID
    // this.formatWeekList();
  }
  
  // get / set currentDate state
  setCurrentDate () {
    let newDate = Date();
    this.setState({currentDate: newDate})
  }
  
  
  // TODO filter user tasks by date and current user ID
  
  
  // get user's currentWeekTasks for 7 days from currentDate
  getCurrentWeekTasks () {
    // var currentWeekTasks = [];
    // var path = `/tasks/${userID}`; //TODO
    console.log('getCurrentWeekTasks........')
    let context = this;
    
    axios.get('/tasks')
    .then ( (results) => {
      console.log('getCurrentWeekTasks', results.data);
      context.setState({currentWeekTasks: results.data})
      return results.data;
    })
    .then ( (results) => {
      context.formatWeekList();
    })
    .catch( (error) => {
      console.log(error)
    })
  }
  
  // TODO ...........
  // formatWeekData and set weekList state;
  // create a var weekList set to an empty array
  //   loop over currentWeekTasks 
  //      for each task
  //        iterate over WeekList
  //          if date  does not exist
  //            create new object
  //            set date and  set taskCounter to 1 
  //          else
  //            increment taskCounter to list at date
  //  set weekList state to weekList
  formatWeekList () {
    let weekList = [];
    //console.log('formatWeekList task....');
    //console.log('::::::', this.state.currentWeekTasks)
    
    this.state.currentWeekTasks.forEach( (task) => {
      console.log('formatWeekList task: ', task);
      
      //let found = false;
      
      // if weekList state is empty
      let obj = {};
      obj.date = task.startTime;
      obj.taskCount = 1;
      weekList.push(obj);
     }) 
      
      
    //   this.state.weekList.forEach( (weekListItem) => {
        
    //     if (task.startTime  === weekListItem.date) {
    //       let obj = weekListItem;
    //       obj.taskCount++;
    //       weekList.push(obj);
    //       found = true;
    //     }
    //    })
      
    //     if ( !found ) {
    //       let obj = {};
    //       obj.date = weekListItem.date;
    //       obj.taskCount = 1;
    //       weekList.push(obj);
    //     }
    // })
    console.log(this.state.weekList)
    this.setState({weekList: weekList});
    console.log(this.state.weekList)
    
  }
  
  
  
  render (props) {
    return (
    
        <div className="week-view-container">
          <Paper style={listStyles}>
            
            <div className="week-title"> <h3>WEEKLY TASKS</h3></div>
           
           
            <div className="week-list">       
              
              <Paper style={listStyles}>
                <Menu>               
                  { this.state.weekList.map( (day, index) =>
                    <MenuItem key={index} primaryText={day.date} />                 
                    )
                  }               
                </Menu>
              </Paper>
            
    
              <Paper style={listStyles}>
                <Menu>  
                  { this.state.weekList.map( (day, index) => 
                    <MenuItem key={index} primaryText={`${day.taskCount} Tasks`} />
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
       </div>  
      
    )
  }
  
}

export default Weekly;
