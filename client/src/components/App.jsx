import React from 'react';
import AddTask from './AddTask.jsx';
import Duck from './Duck.jsx';
import Weekly from './Weekly.jsx';
import AppHeader from './AppHeader.jsx';
import Notes from './Notes.jsx';
import Chart from './Chart.jsx'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: null,
      currentWeekData: [],
      weekState: [
        {date: 'Monday', count: 0},
        {date: 'Tuesday', count: 0},
        {date: 'Wednesday', count: 0},
        {date: 'Thursday', count: 0},
        {date: 'Friday', count: 0},
        {date: 'Saturday', count: 0},
        {date: 'Sunday', count: 0}
      ],
      addTaskActive: false
    }
  }

  componentDidMount() {
    this.setState({userId: localStorage.getItem('userId')})
  }

  setUserIdToState = (userId) => {
    this.setState({userId: userId});
  }

  clearUserIdFromState = () => {
    this.setState({userId: null});
  }

  toggleAddTaskForm = () => this.setState({addTaskActive: !this.state.addTaskActive});

  updateCurrentWeekData = (data) => {
    this.setState({currentWeekData: data})
  }

  render(props) {

    return (
      <div>
        <div className="app-container">
          <AppHeader logged={!(!this.state.userId)} setUserIdToState={this.setUserIdToState} clearUserIdFromState={this.clearUserIdFromState} />
          <div className='col-left'>
            <Duck className='duck-view'/>
            <div className='chart'><Chart data={this.state.currentWeekData} /></div>
          </div>
          <div className='col-center'>


            <Weekly 
              week={this.state.weekState} 
              className='weekly-view' 

              userId={this.state.userId}
              logged={!(!this.state.userId)}
              showAddTaskForm={this.toggleAddTaskForm}
              setWeekDataState = {this.updateCurrentWeekData}
              />
           


          </div>
          <div className='col-right'>
            <Notes userId={this.state.userId} />
          </div>
          {
            <Drawer width={400} openSecondary={false} open={this.state.addTaskActive} >
              <AppBar iconStyleLeft={{display: 'none'}} title="Add Task" />
              <AddTask userId={this.state.userId} closeAddTaskForm={this.toggleAddTaskForm} /> 
            </Drawer>
          } 
        </div>
      </div>
      )
  }
}

export default App;
