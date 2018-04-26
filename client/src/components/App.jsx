import React from 'react';
import AddTask from './AddTask.jsx';
import Duck from './Duck.jsx';
// import SvgIcon from 'material-ui/SvgIcon';
import Weekly from './Weekly.jsx';
import AppHeader from './AppHeader.jsx';
import Notes from './Notes.jsx';
import Chart from './Chart.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: null,
      weekState: [
        {date: 'Monday', count: 0},
        {date: 'Tuesday', count: 0},
        {date: 'Wednesday', count: 0},
        {date: 'Thursday', count: 0},
        {date: 'Friday', count: 0},
        {date: 'Saturday', count: 0},
        {date: 'Sunday', count: 0}
      ]
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

  render(props) {
    
    return ( 
      <div>
        <div className="app-container">
          <AppHeader logged={!(!this.state.userId)} setUserIdToState={this.setUserIdToState} clearUserIdFromState={this.clearUserIdFromState} />
          <div className='col-left'>
            <AddTask className='add-task' userId={this.state.userId}/>
            <Duck className='duck-view'/>
          </div>
          <div className='col-center'>

          
           { this.state.userId ?

            <Weekly 
              week={this.state.weekState} 
              className='weekly-view' 
              userId={this.state.userId}
              logged={!(!this.state.userId)}
              />
              :
              null
              
           }


          </div>
          <div className='col-right'>
            <Notes userId={this.state.userId} />
            <div className='chart'><Chart /></div>
          </div>
        </div>
      </div>
      )
  }
}

export default App;
