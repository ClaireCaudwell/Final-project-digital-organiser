import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/digitalOrganiser";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

/* To do:
1. Set up model so each schedule item is added under the specific users username - combine both models?
2. POST endpoint for the user to create  */

/* Model for the users username:
Added access token so this can be used to authorize the user when they want to login again */
const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
    unique: true, 
  }
});

// Model for a schedule item - need to somehow combine both of these so this is created for each user?
const Scheduleitem = mongoose.model("Scheduleitem", {
  item: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  itemDate: {
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

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world")
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
