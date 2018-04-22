import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

class Notes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notes: []
    }
    this.handleTextfieldChange = this.handleTextfieldChange.bind(this)
    this.submitNote = this.submitNote.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.getNotes = this.getNotes.bind(this)
  }
  style = {
    marginRight: 20,
  };

  handleTextfieldChange(event) {
    this.setState({text: event.target.value})
  }

  submitNote() {
    let notes = this.state.notes;
    notes.push({text: this.state.text, userId: this.props.userId})
    this.setState({notes: notes})
    axios.post('/notes', {text: this.state.text, userId: this.props.userId})
    this.getNotes()
  }

  handleDelete(noteId) {
    axios.delete(`notes?noteId=${noteId}`)
      .then((res) => {
        console.log(res)
      })
    this.getNotes()
  }

  getNotes() {
    axios.get(`/notes?userId=${this.props.userId}`)
    .then((res) => {
      this.setState({notes: res.data})
    })
  }

  componentWillReceiveProps(nextProps) {
    axios.get(`/notes?userId=${nextProps.userId}`)
      .then((res) => {
        this.setState({notes: res.data})
      })
  }


  render() {
    return(
      <div className='notes-wrap'>
        <ul className="notes">
          {
            this.state.notes.map((note, ind) => {
              return <li key={note._id ? note._id : ind} className="note">
                <div className="noteText">
                  {note.text} 
                </div>
                <div className="deleteNoteButton">
                  <FlatButton label="Delete" primary={true} onClick={() => this.handleDelete(note._id)} />
                </div>
                
              </li>
            })
          }
        </ul>
        <div className="addNoteForm">
          <div className="addNoteTextField">
            <TextField hintText="Add your note" onChange={this.handleTextfieldChange} />
          </div>

          <div className="addNoteButton">
            <FloatingActionButton mini={true} style={this.style} onClick={this.submitNote} >
              <ContentAdd />
            </FloatingActionButton>
          </div>

        </div>
      </div>
    )
  }
}

// const NoteEntry(props) => {
//   return (
    
//   )
// }

export default Notes;