import React from 'react';
import AddTask from './AddTask.jsx';
import Duck from './Duck.jsx';

// import SvgIcon from 'material-ui/SvgIcon';
import Weekly from './Weekly.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
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
              <Weekly />
            </div>
          </div>

          <div className='col-right'>
            <div className='notes'>NOTES</div>
            <div className='chart'>CHART</div>
          </div>


        </div>


       // </MuiThemeProvider>

      )
  }
}

export default App;
