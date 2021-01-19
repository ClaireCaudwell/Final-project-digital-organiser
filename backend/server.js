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
const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 20,
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
  scheduleitem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scheduleitem",
  },
});

const Scheduleitem = mongoose.model("Scheduleitem", {
  item: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  time: {
    type: Date,
    default: () => Date.now(),
  },
  delete: {
    type: Boolean,
    default: false,
  },
});

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

// POST endpoint for username and password to be saved to the database
// Returned in json id, token, name and status message returned to frontend and stored in the redux store
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

// POST endpoint for existing user to login
// username is checked in the database, if success the ide, token, name and message is returned to frontend and saved in redux store
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
    res.status(404).json({ notFound: true, errorMessage: "User not found", error });
  }
});

// If the accessToken is authorized in the authenticateUser function then line 123 will be triggered, thus triggering the GET endpoint.
// This endpoint is called in the redux store when the user either signs up or logs in successfully (a valid id and access token is created and stored in redux store). 
// The users id is used in the url in the fetch to identify the user.
// If successful then the Organiser.js is rendered taking the user to their organiser
app.get("/users/:id/organiser", authenticateUser);
app.get("/users/:id/organiser", async (req, res) => {
  const successMessage = `${req.user.username} welcome to your organiser`;
  res.status(201).json({ successMessage });
});

// GET endpoint to get all of the users schedule items for the week they click on the calendar
// Send in body the user Id and week range? Not quite sure yet how to do this
app.get("/schedule", async (req, res) => {

});

// POST endpoint where the user can add a new schedule item to their weekly schedule
// The user is found by the userId stored in the redux store?
// The data sent from the frontend is item, date, time, userId and this is sent to the database by adding a new ScheduleItem
app.post("/scheduleitem", async (req, res) => {
  try {
    const { item, date, time, userId } = req.body;
    const user = await findOne({ userId });
    if ( user === userId ){
      const scheduleItem = new Scheduleitem({ description: "scheduleItem", item });
      scheduleItem.save();
      res.status(200).json({ itemId: scheduleItem._id, statusMessage: "Schedule item created" });
    } else {
        throw "User not found"
    }
  } catch (error) {
    res.status(400).json({ statusMesssage: "Could't create schedule item.", error});
  }
});

// DELETE endpoint where a schedule item can be deleted from the database based on the schedule items id?
app.delete("/deletescheduleitem/:id", async (req, res) => {

});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
