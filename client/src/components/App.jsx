import React from 'react';
import AddTask from './AddTask.jsx';
import Duck from './Duck.jsx';
// import SvgIcon from 'material-ui/SvgIcon';
import Weekly from './Weekly.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: null,
      weekState: [
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

  componentDidMount() {
    var userId = window.location.search.split('=')[1]
    console.log(window.location)
    if ( userId !== this.state.userId ){
      this.setState({userId: userId});
    }
  }

  render(props) {
    return (
        <div className="container">


          <div className="nav-left"> LEFT  </div>
          <div className="nav-center"> <h1> TITLE </h1> </div>
          <div className="nav-right"> RIGHT </div>


          <div className='col-left'>
            <AddTask className='add-task' />
            <Duck className='duck-view'/>
          </div>

          <div className='col-center'>
            <div className='weekly-view'> 
               
              <Weekly week={this.state.weekState} />
            </div>
          </div>

          <div className='col-right'>
            <div className='notes'>NOTES</div>
            <div className='chart'>CHART</div>
          </div>


        </div>

  
    

      )
  }
}

export default App;
