import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (

          <div className='container'>

            <div className='header'>HEADER</div>

            <div className='main'>MAIN
              <div className='add-task'>ADD TASK</div>
              <div className='daily'>DAILY</div>
              <div className='right-col'>
                <div className='weekly'>WEEKLY</div>
                <div className='notes'>NOTES</div>
              </div>

            </div>
          </div>


      )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

