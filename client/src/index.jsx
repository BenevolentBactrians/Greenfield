import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (

          <div className="container">

            <div className="header">  
              <div className="header-left"> LEFT </div>
              <div className="header-center"> <h1>TITLE </h1></div>
              <div className="header-right"> RIGHT </div>   
            </div>
              
            <div className='col-left'>
              <div className='add-task'> ADD TASK </div>
              <div className='duck-view'> ASK THE DUCK </div>
            </div>
            
            <div className='col-center'>
              <div className='weekly-view'> WEEKLY OUTLOOK </div>
            </div>
            
            <div className='col-right'>
              <div className='notes'>NOTES</div>
              <div className='chart'>PROGRESS</div>
            </div>


          </div>


      )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

