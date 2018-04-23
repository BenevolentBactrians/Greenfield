import React from 'react';
import MenuItem from 'material-ui/MenuItem';
// import axios from 'axios';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import Daily from './Daily.jsx'

class WeeklyTaskEntry extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick () {
    console.log('clicked:', this.props.day.date);
    this.setState({open: true});
  }


  handleClose () {
    this.setState({open: false});
  }

  render () {
    var date = this.props.day.date.getTime()
    date = moment(date).format('LL');

    

    return ( 

      <div>
        <MenuItem
          primaryText={date}
          secondaryText={`${this.props.day.tasks.length} Task(s)`}
          onClick={this.handleClick}
          />
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
         >
           <Daily tasks={this.props.day.tasks} date={this.props.day.date}/>
        </Dialog>
      </div>
    )
  }

}



export default WeeklyTaskEntry;