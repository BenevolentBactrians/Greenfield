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
      notes: [],
      text: ''
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
    let notes = this.state.notes.slice();
    
    
    axios.post('/notes', {text: this.state.text, userId: this.props.userId})
      .then((res) => {
        notes.push(res.data)
        this.setState({notes: notes})
      })
    this.setState({text: ''})
  }

  handleDelete(noteId) {
    console.log(noteId)
    axios.delete(`notes?noteId=${noteId}`)
      .then((res) => {
        this.getNotes()
      })
    
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
            <FloatingActionButton mini={true} style={this.style} onClick={this.submitNote} disabled={this.state.text === ''} >
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