const mongoose = require('mongoose');
const quotes = require('./quotes.js')
mongoose.connect('mongodb://localhost/greenfield');  // connection defaults to port 27017

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('mongoose db connection open..'));


const userSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: true,
      index: { unique: true },
      lowercase: true
    },
    hashedPassword: String,
    salt: String
  }
);

let User = mongoose.model('User', userSchema);


const taskSchema = new mongoose.Schema (
  {
    userId: String,
    task: String,
    date: Date,
    description: String,
    startTime: Date,
    endTime: Date
  }
);

let Task = mongoose.model('Task', taskSchema);


const noteSchema = new mongoose.Schema (
  {
    userId: String,
    text: String
  }
);

let Note = mongoose.model('Note', noteSchema);


const quoteSchema = new mongoose.Schema (
  {
    text: String
  }
);

let Quote = mongoose.model('Quote', quoteSchema);


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
    } else {
      callback();
      console.log('New user added to db: ', newUserEntry);
    }
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
  User.findOne(query, (err, user) => {
    if (err) {
      callback(err);
    }
    callback(null, user);
  })
}


// -- Task Functons --
let saveTask = (taskObj) => {
  console.log('Saving task to database..');

  //deconstructs the task object from request body
  const {userId, task, date, startTime, endTime, description} = taskObj;
  const formatted = {
    userId: userId,
    task: task,
    date: date,
    startTime: startTime,
    endTime: endTime,
    description: description
  }
  //save new task to database
    new Task(formatted).save( (err, newTaskEntry) => {
      if (err) {
        throw err;
      }
      console.log('New task added to db: ', newTaskEntry);
    })
}

let getTasksOnDate = (userId, date, callback) => {
  Task.find({userId: userId, date: date}, 'task description startTime endTime', function(err, results) {
    if (err) {
      console.error(err)
    } else {
      callback(results)
    }
  })
}



// -- Note Functons --
const saveNote = (text, userId, callback) => {
  var formatted = {
    text: text,
    userId: userId
  }

  new Note(formatted).save( (err, newNoteEntry) => {
    if (err) {
      console.log( err ) ;
    }
    callback(newNoteEntry)
  })
}

const getNotesForUser = function(userId, callback) {
  Note.find( { userId: userId }, (err, result) => {
    err ? console.log(err) : callback(result)
  })
}

const deleteNote = function(noteId, callback) {
  Note.remove({_id: noteId}, (err) => {
    if(err) {
      console.log(err)
    } else {
      callback()
    }
  })
}

const saveQuote = function(text) {
  const quote = {
    text: text
  }
  new Quote(quote).save( (err) => {
    if (err) {
      console.log(err);
    }
  })
}

const getAllQuotes = function(callback) {
  Quote.find( (err, quotes) => {
    if (err) {
      throw err;
    }
    callback(quotes);
  })
}

// ====================================================
//         populate quotes table
// ====================================================
quotes.quotes.forEach((quote, ind) => {
  var query = {text: quote}
  Quote.findOne(query, (err, result) => {
    if (err) {
      console.log(err);
    }
    if ( result === null) {
      saveQuote(quote)
    }
  })

})



module.exports = {
  saveUser,
  saveTask,
  saveNote,
  getAllUsers,
  getUser,
  db,
  getNotesForUser,
  deleteNote,
  saveQuote,
  getAllQuotes,
  getTasksOnDate
}
