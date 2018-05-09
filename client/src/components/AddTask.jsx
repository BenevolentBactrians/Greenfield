import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';
import Paper from 'material-ui/Paper';

//add
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const styles = {
  customWidth: {
    width: 200,
  },
};

class AddTask extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      task: '',
      date: null,
      startTime: null,
      endTime: null,
      description: '',
      open: false,
      logOpen: false,
      emptyOpen: false,
      today: new Date(),
      categoryValue: 0,
      categories: [
        {id: 1, name: 'urgent'},
        {id: 2, name: 'erand'}, 
        {id: 3, name: 'personal'},
        {id: 4, name: 'friends'},        
        {id: 5, name: 'fitness'},               
      ],
      taskCategory: '',
    }

    this.onChangeTask = this.onChangeTask.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeEnd = this.onChangeEnd.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.onCategorySelect = this.onCategorySelect.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.task || !this.state.date ||  !this.state.startTime || !this.state.endTime || !this.state.description) {
      this.setState({emptyOpen: true})
    } else {
      axios.post('/task', {
        task: this.state.task,
        date: this.state.date,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        description: this.state.description,
        category: this.state.taskCategory,
        userId: this.props.userId
      }, {validateStatus: function(status) {
        return status === 201 || status === 200 || status === 403}
      }).then((response) =>  {
        if (response.status === 403) {
          this.setState({
            logOpen: true
          })
        } else {
        this.setState({
          task: '',
          date: null,
          startTime: null,
          startTIme: null,
          endTime: null,
          description: '',
          category: '',
          open:true
        })
        this.props.closeAddTaskForm()
      }}).catch(function(err, response) {
        console.error(err);
      })
    }
  }

  onChangeTask(e) {
    this.setState({
      task: e.target.value, logOpen: !this.props.userId
    })
  }

  onChangeDate(e, date) {
    this.setState({
      date: date, logOpen: !this.props.userId
    })
  }

  onChangeStart(e, time) {
    this.setState({
      startTime: time, logOpen: !this.props.userId
    })
  }

  onChangeEnd(e, time) {
    this.setState({
      endTime:time, logOpen: !this.props.userId
    })
  }

  onChangeDesc (e) {
    this.setState({
      description: e.target.value, logOpen: !this.props.userId
    })
  }

  onCategorySelect(event, value) {
    console.log('onCategorySelect ', event.target.innerText);
    console.log('value ', value);
    this.setState({ categoryValue: value, taskCategory: event.target.innerText })

  }

  handleRequestClose() {
    this.setState({
      open: false,
      logOpen: false,
      emptyOpen: false
    })
  }

  render() {
    return (
          <form onSubmit={this.handleSubmit} className="add-task-form">
             <TextField
              id='task'
              value={this.state.task}
              onChange={this.onChangeTask}
              floatingLabelText="task"
            />
            <DatePicker
              id="date"
              minDate={this.state.today}
              value={this.state.date}
              hintText="yyyy/mm/dd"
              onChange={this.onChangeDate}
              formatDate={(date) => {
                return date.toLocaleString('en-US',{weekday: "long", year: "numeric", month: "long", day: "numeric"})
              }}
            />
            <TimePicker
              id="starttime"
              format="ampm"
              hintText="start time"
              value={this.state.startTime}
              onChange={this.onChangeStart}
            />
            <TimePicker
              id="endtime"
              format="ampm"
              hintText="end time"
              value={this.state.endTime}
              onChange={this.onChangeEnd}
            />
            <TextField
              id='description'
              value={this.state.description}
              onChange={this.onChangeDesc}
              floatingLabelText="description"
              rows={2}
            />
        <DropDownMenu
          value={this.state.categoryValue}
          onChange={this.onCategorySelect}
        >
          <MenuItem value={0} primaryText="Category" />
          {this.state.categories.map((category, idx) => {
            return ( <MenuItem value={idx + 1} primaryText={category.name} />)
          })}
        </DropDownMenu>
            <RaisedButton
              onClick={this.handleSubmit}
              label="add task"
              style={{marginTop: '10px'}}
              disabled={!this.props.userId || !this.state.task || !this.state.date ||  !this.state.startTime || !this.state.endTime || !this.state.description}
            />
            <Snackbar
              open={this.state.open}
              message="task added"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
             <Snackbar
              open={this.state.logOpen}
              message="Please Login first"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />

             <Snackbar
              open={this.state.emptyOpen}
              message="Please complete all fields"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
          </form>
      )
  }
}

export default AddTask;

