import React from 'react';
import ReactDOM from 'react-dom';
//import MuiThemeProvider from 'material-ui';


class Weekly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      week: [
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
  
  render (props) {
    return (
      
      <div className="week-view-container"> 
        
        <div className="week-view-title"> Weekly Tasks </div>
        
        <div className="week-list">
          
          
          <div className="week-list-items">
            <ul>
            { this.state.week.map( (day, index) =>
              <div>
                <li key={index}>{day.name}</li>
              </div>
              )
             }
            </ul>
          </div>
          
          <div className="week-list-sum">
            <ul>
              { this.state.week.map( (day, index) =>
                <div>
                  <li key={index}>{day.total}</li>
                </div>
                )
               }
              </ul>
          </div>
          
          
        </div>
      
      </div>  
    )
  }
  
}

export default Weekly