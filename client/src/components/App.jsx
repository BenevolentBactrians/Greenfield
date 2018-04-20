import React from 'react';
import Weekly from './Weekly.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render(props) {
    return (

    
      <MuiThemeProvider>

        <div className="container">


          <div className="nav-left"> LEFT  </div>
          <div className="nav-center"> <h1> TITLE </h1> </div>
          <div className="nav-right"> RIGHT </div>   

            
          <div className='col-left'>
            <div className='add-task'> ADD TASK </div>
            <div className='duck-view'> DUCK </div>
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

    </MuiThemeProvider>   
      


      )
  }
}

export default App;
