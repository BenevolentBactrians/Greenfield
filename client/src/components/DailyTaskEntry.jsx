import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

class DailyTaskEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      checked: false,
      open: false
    }
    this.updateCheck = this.updateCheck.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  updateCheck() {
    this.setState({
      checked: this.state.checked ? false : true
    })

    if (!this.state.checked) {
    axios.put(`http://localhost:3000/taskCheck/${this.props.task._id}`)
    } else {
    axios.put(`http://localhost:3000/taskUnCheck/${this.props.task._id}`)
    }
  }

  handleOpen() {
    this.setState({
      open:true
    })
  }

  handleClose() {
    this.setState({
      open:false
    })
  }

  handleDelete(taskId) {
    console.log('OBJECT TO DELETEEEEEE!!!!!!', this.props.task)
   this.props.handleDelete(this.props.task._id)
  }

  render() {
    return (

      <div className='daily-task-entry-container'>
        <span className='checkbox'>
          <Checkbox
          checked={this.state.checked}
          onCheck={this.updateCheck}
          />
        </span>
        <span onClick={this.handleOpen} className='daily-entry-name'>{this.props.task.task}</span>
        <Dialog
          title="Task Description"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.props.task.description}
        </Dialog>
        <span className='daily-start-time'>{new Date((this.props.task.startTime)).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})}
        </span>
        <span className='daily-end-time'>{new Date((this.props.task.endTime)).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})}</span>
        <span className='daily-delete-button'>
          <FlatButton label="Delete" primary={true} onClick={this.handleDelete} />
        </span>
      </div>
      )
  }
}

export default DailyTaskEntry;