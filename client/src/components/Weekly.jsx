import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};


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
     
      
        <div>
          <Paper style={style}>
            <Menu>
              <MenuItem primaryText="Maps" />
              <MenuItem primaryText="Books" />
              <MenuItem primaryText="Flights" />
              <MenuItem primaryText="Apps" />
            </Menu>
          </Paper>
          <Paper style={style}>
            <Menu>
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" />
            </Menu>
          </Paper>
        </div>
         
      
    )
  }
  
}

export default Weekly

     // <div className="week-view-container"> 
        
     //    <div className="week-view-title"> Weekly Tasks </div>
        
     //    <div className="week-list">
          
          
     //      <div className="week-list-items">
            
     //        <ul>
     //        { this.state.week.map( (day, index) =>
              
     //            <li key={index}>{day.name}</li>
              
     //          )
     //         }
     //        </ul>
            
     //      </div>
          
     //      <div className="week-list-sum">
     //        <ul>
     //          { this.state.week.map( (day, index) =>
               
     //              <li key={index}>{day.total}</li>
                
     //            )
     //           }
     //          </ul>
     //      </div>
          
          
     //    </div>
      
     //  </div>  