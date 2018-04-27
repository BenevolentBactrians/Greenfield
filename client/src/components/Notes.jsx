import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';

class Notes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notes: [],
      text: '',
      logInSnackBarOpen: false,
      noteAddedSnackBarOpen: false
    }
    this.handleTextfieldChange = this.handleTextfieldChange.bind(this);
    this.submitNote = this.submitNote.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleRequestClose = () => {
    this.setState({
      noteAddedSnackBarOpen: false,
      logInSnackBarOpen: false
    });
  };

  handleTextfieldChange(event) {
    this.setState({text: event.target.value, logInSnackBarOpen: !this.props.userId})
  }

  submitNote() {
    let notes = this.state.notes.slice();
    axios.post('/notes', {text: this.state.text, userId: this.props.userId})
      .then((res) => {
        notes.push(res.data)
        this.setState({notes: notes, noteAddedSnackBarOpen: true})
      })
    this.setState({text: ''})
  }

  handleDelete(noteId) {
    let notes = this.state.notes.slice();
    axios.delete(`notes?noteId=${noteId}`)
      .then((res) => {
        this.setState({notes: notes.filter((note, ind) => note._id !== noteId) });
      })
    
  }

  componentWillReceiveProps(nextProps) {
    if( !nextProps.userId ) {
      this.setState({notes: []});
    } else {
      axios.get(`/notes?userId=${nextProps.userId}`)
      .then((res) => {
        this.setState({notes: res.data})
      })
    }
  }

  componentWillMount() {
    if ( this.props.userId ) {
      this.setState({notes: []});
    } else { 
        axios.get(`/notes?userId=${this.props.userId}`)
        .then((res) => {
        this.setState({notes: res.data})
      })
    }
  }

  render() {
    return(
      <Paper className="paper" >
      <div className='notes-wrap'>

        <div className="notes">
          <h2>Notes</h2>
          {
            this.state.notes.map((note, ind) => {
              return <div key={note._id ? note._id : ind} className="note">
                <div className="noteText">
                  {note.text} 
                </div>
                <div className="deleteNoteButton">
                  <FlatButton label="Delete" primary={true} onClick={() => this.handleDelete(note._id)} />
                </div>
                
              </div>
            })
          }
        </div>
        <div className="addNoteForm">
          <div className="addNoteTextField">
            <TextField hintText="Add your note" onChange={this.handleTextfieldChange} value={this.state.text} />
          </div>

          <div className="addNoteButton">
            <FloatingActionButton mini={true} onClick={this.submitNote} disabled={this.state.text === '' || !this.props.userId} >
              <ContentAdd />
            </FloatingActionButton>
          </div>

        </div>
        <Snackbar
          open={this.state.noteAddedSnackBarOpen}
          message="Note added"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        <Snackbar
          open={this.state.logInSnackBarOpen}
          message="You are logged out, please login to add a note."
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
      </Paper>
    )
  }
}

export default Notes;