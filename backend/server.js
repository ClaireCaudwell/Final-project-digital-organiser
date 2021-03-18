import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/digitalOrganiser";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const userSchema = new mongoose.Schema( {
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 30,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
    unique: true, 
  },
  // Array of tasks
  // subdocument - saved whenever their top-level parent document is saved
  scheduleTask: [{
    task: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: true,
    },
    startdatetime: {
      type: Date,
    },
    delete: {
      type: Boolean,
      default: false,
    }, 
  }],
  // Array for users notes
  notes: [{
    noteText: {
      type: String,
      maxlength: 170,
    },
    colour: {
      type: Number,
      default: 0, 
    }
  }]
});

const User = mongoose.model("User", userSchema);

// Authenticate user endpoint when user signs up or logs in
const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ accessToken: req.header("Authorization")});
    if (user) {
      req.user = user;
      next();      
    } else {
      const errorMessage = "Please try logging in again";
      res.status(401).json({ loggedOut: true, error: errorMessage, error });
    }
  } catch (error) {
    const errorMessage = "Please try logging in again";
    res.status(401).json({ error: errorMessage, error });
  }
}; 

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const documentation = {
  "Welcome": "Welcome to Claire's digital organiser API 🌼",
  "Endpoint 1": {
    "https://claires-digital-organiser.herokuapp.com/users": "POST endpoint - Creates a user. Requires username and password in fetch body.",
  },
  "Endpoint 2": {
    "https://claires-digital-organiser.herokuapp.com/sessions": "POST endpoint- to find user in database based on username and password. Requires username and password in fetch body.",
  },
  "Endpoint 3": {
    "https://claires-digital-organiser.herokuapp.com/users/:id/organiser": "GET endpoint - Requires user ID in the path and sending access token in the fetch headers to authenticate user. Gives access to the users organiser if access token in valid.",
  },
  "Endpoint 4": {
    "https://claires-digital-organiser.herokuapp.com/users/:id/scheduletask": "POST endpoint - Requires user ID in the path and scheduletask (the description of the task) and startDateTime(combination of date and time) sent in the fetch body. Posts a schedule task to the schedule task array for that user.",
  },
  "Endpoint 5": {
    "https://claires-digital-organiser.herokuapp.com/users/:id/scheduleweek/:starttime": "GET endpoint - Requires user ID in the path and the Monday date for the week you want to get the tasks for sent in the body. Get's that weeks tasks for that user from the Monday to the Sunday date.",
  },
  "Endpoint 6": {
    "https://claires-digital-organiser.herokuapp.com/users/:id/scheduletask/:taskid": "GET endpoint - Requires user ID and the task ID in the path. Get's the specific task for that user.",
  },
  "Endpoint 7": {
    "https://claires-digital-organiser.herokuapp.com/users/:id/scheduletask/:taskid": "PATCH endpoint - Requires user ID and the task ID in the path. Updates the specific task for that user.",
  },
  "Endpoint 8": {
    "https://claires-digital-organiser.herokuapp.com/users/:id/scheduletask/:taskid": "DELETE endpoint - Requires user ID and the task ID in the path. Deletes the specific task for that user.",
  },
  "Endpoint 9": {
    "https://claires-digital-organiser.herokuapp.com/users/:id/note": "POST endpoint - Requires user ID in the path. Creates an object containing default id and colourNumber for the note in the users notes array.",
  },
  "Endpoint 10": {
    "https://claires-digital-organiser.herokuapp.com/users/:id/note": "GET endpoint - Requires user ID in the path. Gets the users array of notes.",
  },
  "Endpoint 11": {
    "https://claires-digital-organiser.herokuapp.com/users/:id/note/:noteid": "PATCH endpoint - Requires user ID and note ID in the path. And you can send a noteText(the text of the note) and colourNumber(Number the note will be which corresponds to a class name/colour in the frontend) in the body. Cannot send in noteText and colourNumber at the same time when updating the users note, only seperately depending on what you want to do.",
  },
  "Endpoint 12": {
    "https://claires-digital-organiser.herokuapp.com/users/:id/note/:noteid": "DELETE endpoint - Requires user ID and task ID in the path. Deletes the specified note for that user.",
  },
};

app.get('/', (req, res) => {
  res.json(documentation);
});

// POST endpoint to create user
// Returns access Token amongst other things
app.post("/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const user = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save();
    res.status(200).json({ userId: user._id, accessToken: user.accessToken, username: user.username, statusMessage: "User created" });
  } catch (error) {
    res.status(400).json({errorMessage: "Sign up failed. Please enter a valid username and password", error})
  }
});

// POST endpoint to find user in database based on username and password
// Returns access Token amongst other things
app.post("/sessions", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ userId: user._id, accessToken: user.accessToken, username: username, statusMessage: "Logged in" });
    } else {
      throw "User not found";
    }
  } catch (error) {
    res.status(404).json({ errorMessage: "Login failed. Please check your username and password", error });
  }
});

// If user is authenticate i.e. if they have a valid access token then the GET endpoint is actioned
app.get("/users/:id/organiser", authenticateUser);
app.get("/users/:id/organiser", async (req, res) => {
    res.status(201).json({ statusMessage: "Connected to organiser" });
});

//-------------------- Schedule Endpoints -------------------- //
// POST endpoint adding a schedule task to the users schedule task array
app.post("/users/:id/scheduletask", async (req, res) => {
  try {
    const userId = req.params.id;
    const { scheduletask, startDateTime } = req.body;
    let user;
    try {
      user = await User.findById(userId);
    } catch(error) {
        throw "User not found";
    }
    user.scheduleTask.push({ task: scheduletask, startdatetime: startDateTime })
    user.save();
    const addedTask = user.scheduleTask[user.scheduleTask.length-1];
    res.status(200).json({ statusMessage: "Task added to your schedule" });
  } catch (error) {
    res.status(400).json({ notFound: true, errorMesssage: "Could't add to your schedule", error});
  }
});

// GET endpoint to get the weekly schedule for the user
// Filters based on the start and end of week date 
app.get("/users/:id/scheduleweek/:starttime", async (req, res) => {
  try {
    // 3 
    const userId = req.params.id;
    let user;
    try {
      user = await User.findById(userId);
    } catch(error) {
      throw "User not found";
    } // 4
      const startOfWeek = new Date(req.params.starttime);
      if(startOfWeek.toString() === "Invalid Date") {
        throw "Start of week date invalid";
      }
      // 5
      const endOfWeek = new Date(startOfWeek.valueOf());
      endOfWeek.setDate(startOfWeek.getDate()+7);
      // 6
      const arrayOfTasks = user.scheduleTask;    
      // 7
      const filteringTask = (task) => {
        if(task.startdatetime >= startOfWeek && task.startdatetime < endOfWeek && task.delete === false) {
          return true;
        } else {
          return false;
        }
      };
      //8
      const weeklySchedule = arrayOfTasks.filter(filteringTask);
      res.status(201).json({ weeklySchedule: weeklySchedule, statusMessage
      : "Schedule retrieved" });
    } catch(error) {
      res.status(404).json({ error });
    }
});

// GET endpoint to get a single task based on user and task id
app.get("/users/:id/scheduletask/:taskid", async (req, res) => {
  try {
    const userId = req.params.id;
    const taskId = req.params.taskid;
    let user;
    try {
      user = await User.findById(userId);
    } catch(error) {
      throw "User not found";
    }
    const arrayOfTasks = user.scheduleTask;
    const filteringTask = (task) => {
      if(task._id.toString() === taskId) {
        return true;
      } else {
        return false;
      }
    }
    const individualTask = arrayOfTasks.filter(filteringTask);
    if(individualTask.length === 0) {
      throw "Task ID not found"
    }
    res.status(201).json({ taskId: individualTask[0]._id, task: individualTask[0].task, startdatetime: individualTask[0].startdatetime, statusMessage: "Task retrieved" });
     } catch(error) {
    res.status(404).json({ error });
  }
});

// PATCH endpoint to update a single task
app.patch("/users/:id/scheduletask/:taskid", async (req, res) => {
  try {
    const userId = req.params.id;
    const taskId = req.params.taskid;
    const { scheduletask, startDateTime } = req.body;
    let user;
    try {
      user = await User.findById(userId);
    } catch(error) {
        throw "User not found";
    }
    const arrayOfTasks = user.scheduleTask;
    let i;
    for (i = 0; i < arrayOfTasks.length; i++) {
      if(arrayOfTasks[i]._id.toString() === taskId) {
        arrayOfTasks[i].task = scheduletask;
        arrayOfTasks[i].startdatetime = startDateTime;
      }
    }
    user.save();
    const filteringTask = (task) => {
      if(task._id.toString() === taskId) {
        return true;
      } else {
        return false;
      }
    }
    const individualTask = arrayOfTasks.filter(filteringTask);
    if(individualTask.length === 0) {
      throw "Task ID not found"
    }
    res.status(200).json({ taskId: individualTask[0]._id, task: individualTask[0].task, startdatetime: individualTask[0].startdatetime, statusMessage: "Task updated"});
  } catch(error) {
    res.status(400).json({ notFound: true, error});
  }
});

// DELETE endpoint deleting a task
app.delete("/users/:id/scheduletask/:taskid", async (req, res) => {
  try {
    const userId = req.params.id;
    const taskId = req.params.taskid;
    let user;
    try {
      user = await User.findById(userId);
   }
    catch (error) {
      throw "User not found"
  } 
  const arrayOfTasks = user.scheduleTask;
  let indexNumber = false;
  let i;
  for (i = 0; i < arrayOfTasks.length; i++) {
    if(arrayOfTasks[i]._id.toString() === taskId){
      indexNumber = i;
    }
  }
  if(indexNumber === false) {
    throw "Task ID not found"
  }
  // Splicing/removing the element(object) based on the index number of the element from the array
  arrayOfTasks.splice(indexNumber, 1);
  user.save();
  res.status(200).json({ statusMessage: "Task deleted from your schedule"});
} catch(error) {
  res.status(400).json({ notFound: true, errorMesssage: "User not found", error});
}
});

//-------------------- Note Endpoints -------------------- //
// POST endpoint to create a note object in notes array
app.post("/users/:id/note", async (req, res) => {
  try {
    const userId = req.params.id;  
    let user;
    try {
      user = await User.findById(userId);
    } catch(error) {
        throw "User not found";
    }
    user.notes.push({ });
    user.save();
    const addedNote = user.notes[user.notes.length-1];
    res.status(200).json({ noteId: addedNote._id, statusMessage: "Note created" });
  } catch (error) {
    res.status(400).json({ notFound: true, errorMesssage: "Could't create note", error});
  }
});

// GET endpoint to get the array of notes
app.get("/users/:id/note", async (req, res) => {
  try {
    const userId = req.params.id;
    let user;
    try {
      user = await User.findById(userId);
    } catch(error) {
      throw "User not found";
    }
      const arrayOfNotes = user.notes;
      arrayOfNotes.reverse();

      res.status(201).json({ notes: arrayOfNotes, statusMessage
      : "Notes retrieved" });
    } catch(error) {
      res.status(404).json({ error });
    }
});

// PATCH endpoint to update a single note
// Will either be noteText or colourNumber
app.patch("/users/:id/note/:noteid", async (req, res) => {
  try {
    const userId = req.params.id;
    const noteId = req.params.noteid;
    const { noteText, colourNumber } = req.body;
    let user;
    try {
      user = await User.findById(userId);
    } catch(error) {
        throw "User not found";
    }
    const arrayOfNotes = user.notes;
    let i;
    for (i = 0; i < arrayOfNotes.length; i++) {
      if(arrayOfNotes[i]._id.toString() === noteId) {
        if(noteText != null) {
          arrayOfNotes[i].noteText = noteText;
        }
        if(colourNumber != null) {
          arrayOfNotes[i].colour = colourNumber;
        }
      }
    }
    user.save();
    const filteringNote = (note) => {
      if(note._id.toString() === noteId) {
        return true;
      } else {
        return false;
      }
    }
    const individualNote = arrayOfNotes.filter(filteringNote);
    if(individualNote.length === 0) {
      throw "Note ID not found"
    }
    res.status(200).json({ statusMessage: "Note added"});
  } catch(error) {
    res.status(400).json({ notFound: true, error});
  }
});

// DELETE endpoint to delete a note
app.delete("/users/:id/note/:noteid", async (req, res) => {
  try {
    const userId = req.params.id;
    const noteId = req.params.noteid;
    let user;
    try {
      user = await User.findById(userId);
   }
    catch (error) {
      throw "User not found"
  } 
  const arrayOfNotes = user.notes;
  let indexNumber = false;
  let i;
  for (i = 0; i < arrayOfNotes.length; i++) {
    if(arrayOfNotes[i]._id.toString() === noteId){
      indexNumber = i;
    }
  }
  if(indexNumber === false) {
    throw "Note ID not found"
  }
  // Splicing/removing the element(object) based on the index number of the element from the array
  arrayOfNotes.splice(indexNumber, 1);
  user.save();
  res.status(200).json({ statusMessage: "Note deleted"});
} catch(error) {
  res.status(400).json({ notFound: true, errorMesssage: "User not found", error});
}
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});