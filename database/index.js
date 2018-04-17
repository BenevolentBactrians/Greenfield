const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/greenfield');  // connection defaults to port 27017

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('mongoose db connection open..'));


const userSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    hashedPassword: String,
    salt: String
  }  
);

let User = mongoose.model('User', userSchema);


const taskSchema = new mongoose.Schema (
  {
    userId: Number,
    name: String,
    description: String,
    startTime: String,
    endTime: String
  }  
);

let Task = mongoose.model('Task', taskSchema);


const noteSchema = new mongoose.Schema (
  {
    userId: Number,
    text: String
  }
);

let Note = mongoose.model('Note', noteSchema);


// ------------ Database Functions -----------------------


// -- User Functions --

// Save a user or users to the MongoDB
let saveUser = (user, callback) => {
  console.log('Saving users(s) to database ...');
  var formated = {
    name: user.name,
    hashedPassword: user.hashedPassword,
    salt: user.salt
  }
    
  new User(formated).save( (err, newUserEntry) => {
    if (err) {
      callback(err);
    }
    console.log('New user added to db: ', newUserEntry);
  })    
}

let getAllUsers = (callback) => {
  console.log('Getting all users..');
  User.find( (err, users) => {
    if (err) {
      throw err;
    }
    callback(users);
  }) 
}

let getUser = (query, callback) => {
  console.log('Getting user: ', query);
  User.find(query,  (err, user) => {
    if (err) {
      throw err;
    }
    callback(user);
  })
}


// -- Task Functons --
let saveTask = (list) => {
  console.log('Saving task to database..');
  
  if ( !Array.isArray(list) ) {
    list = [list]
  }
  
  list.forEach( (task) => {  
    var formatted = {  
      userId: task.userId,
      name: task.name,
      description: task.description,
      startTime: task.startTime,
      endTime: task.endTime
    }
    new Task(formatted).save( (err, newTaskEntry) => {
      if (err) {
        throw err;
      }
      console.log('New task added to db: ', newTaskEntry);
    }) 
  })
}



// -- Note Functons --
let saveNote = (list) => {
  console.log('Saving note to database..');
  
  if ( !Array.isArray(list) ) {
    list = [list]
  }
  
  list.forEach( (note) => {
    
    var formatted = {  
      id: note.id,
      userId: note.userId,
      text: note.text
    }
  
    new Note(formatted).save( (err, newNoteEntry) => {
      if (err) {
        throw err;
      }
      console.log('New note added to db: ', newNoteEntry);
    })
  })   
}


module.exports.saveUser = saveUser;
module.exports.saveTask = saveTask;
module.exports.saveNote = saveNote;
module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;

