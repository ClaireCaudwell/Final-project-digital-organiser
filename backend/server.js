import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/digitalOrganiser";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

/*
Model structure for the username, password and access token.
Tried to connect the Scheduleitem model, but need to test this to see if it works. 
 */
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
  //Array of subdocument - saved whenever their top-level parent document is saved
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
      minlength: 2,
      maxlength: 170,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    colour: {
      type: Number,
      default: 0, 
    }
  }]
});

const User = mongoose.model("User", userSchema);

// Function is called when the "/users/:id/organiser" is actioned in the getOrganiser function
// Checks the accessToken sent in the headers to see if it exists in the database
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

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

/* # ENDPOINT 1
POST endpoint for username and password to be saved to the database. If username and password are a success (they meet the charachter length requirements) then the users id, token, name and a status message is returned to the frontend and stored in the user.js redux store 
*/
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
    res.status(400).json({errorMessage: "Could not create user", error})
  }
});

/* # ENDPOINT 2
POST endpoint for existing user to login
Username is checked in the database, if success the userId, accessToken, usernam and message is returned to frontend and saved in user.js redux store 
*/
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
    res.status(404).json({ errorMessage: "User not found", error });
  }
});

/* --- ENDPOINT 3 ---
1. The accessToken (stored in redux store after user has signed or logged in successfully) is authorized in the authenticateUser function above. 
2. Then the first GET endpoint below (line 125) will be triggered, thus triggering the second GET endpoint below (line 126). 
3. The users id is sent in the url to further identify the user.
4. If successful then the Organiser.js is rendered taking the user to their organiser
*/
app.get("/users/:id/organiser", authenticateUser);
app.get("/users/:id/organiser", async (req, res) => {
    res.status(201).json({ statusMessage: "Connected to organiser" });
});

/* --- ENDPOINT 4 ---
1. POST endpoint where the user can add a new schedule item to their weekly schedule
2. The user is found by using the userId stored in the redux store
3. The data that creates the new task is scheduleTask, startDateTime
4. This is pushed and saved to the ScheduleTask array in the user's object.
5. To get the data for the last created task so it can be sent back in the json response do length -1. 
5. Also split up the date and time so they can be sent seperatley in the json response.
*/
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
    //Try to change push to findByIdAndUpdate when have time
    user.scheduleTask.push({ task: scheduletask, startdatetime: startDateTime })
    user.save();
    const addedTask = user.scheduleTask[user.scheduleTask.length-1];
    res.status(200).json({ taskId: addedTask._id, task: addedTask.task, startdatetime: addedTask.startdatetime, statusMessage: "Task created" });
  } catch (error) {
    res.status(400).json({ notFound: true, errorMesssage: "Could't create schedule task", error});
  }
});

/* --- ENDPOINT 5 ---
1. GET endpoint to get users schedule for the week when they click on the week in the calendar.
2. This is based on the users Id and the starttime for the week that's passed in the url
3. Search for user by ID.
4. Creating a the date for the start of the week based on the start time for the week sent from the frontend.
5. Creating the date for the end of the week - create a copy of the start of the week date and add 7 days to this.
6. Accessing the whole array of tasks for that user.
7. Creating a function to help with filtering the array of tasks for the user. This compares the startOfWeek date and endOfWeek date to the task dates in the array of tasks.
If there is a task that exist that has a date between the start and end of week dates then it will be true i.e. there will be task(s), otherwise no task(s) exsists between those dates
8. Then we use that function to help filter the array of tasks that have a date between the startOfWeek and endOfWeek dates.
This array of object(s) will be passed back to the frontend and stored in the redux store.
*/
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

// --- ENDPOINT 5 ---
// GET endpoint that will get one task 
// User is found by ID then the array of schedule tasks are accessed
// Then the user id is compared in if statement in the filteringTask function and used on the arrayOfTasks in the filter to filter the task if the Id has been found.
// This is an array with an object in it. 
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

/* --- ENDPOINT 7 ---
1. PUT endpoint to update a users schedule task. 
2. User ID and the task ID is sent in the URL.
3. Find the user by the ID.
4. Once this is accessed then the whole array of tasks are passed into the arrayOfTasks variable. 
5. Then they are iterate through to check for the one to be updated using the taskid.
6. Then if it's a match the task and startdatetime are saved to the users object.
7. Will try and use local storage to hold the data for the tasks for the week, so if the user wants to update one of the properties e.g. task, date or time. Then the data will be shown in the edittask componenent. This will mean that the user won't have to update re-write all details of the task. 
*/
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

/* --- ENDPOINT 8 ---
 1. PUT endpoint where a schedule task's delete property is updated to true
 2. This means that when the user wants to show the weekly tasks in the frontend only the tasks that have delete: false will be returned in the json
*/
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
  res.status(200).json({ statusMessage: "Task deleted"});
} catch(error) {
  res.status(400).json({ notFound: true, errorMesssage: "User not found", error});
}
});

/* --- Endpoint 9 ---
POST endpoint to add an empty note to the users array of notes
*/
app.post("/users/:id/note", async (req, res) => {
  try {
    const userId = req.params.id;  
    let user;
    try {
      user = await User.findById(userId);
    } catch(error) {
        throw "User not found";
    }
    // Pushing an empty object to create an object with the delete and _id properties, so then when the user types in the note in the textarea box a dispatch is done to the PATCH endpoint to update the task with the note text
    user.notes.push({ });
    user.save();
    const addedNote = user.notes[user.notes.length-1];
    res.status(200).json({ noteId: addedNote._id, statusMessage: "Note created" });
  } catch (error) {
    res.status(400).json({ notFound: true, errorMesssage: "Could't create note", error});
  }
});

/* --- ENDPOINT 10 ---
GET endpoint to get the array of notes
*/
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

/* --- ENDPOINT 11 ---
PATCH endpoint to update the note text finding the note by ID and updating the note text
// if the noteText is not equal to null then set the noteText in the notes array in user model to the text being sent in. When the noteText is sent in the fetch as null i.e. updating the colour and not the text the the noteText won't be updated
// Same principle for the colourNumber
*/
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

/* --- ENDPOINT 12 ---
DELETE endpoint to delete a note
*/
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
