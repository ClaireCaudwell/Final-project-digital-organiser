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
1. Set up model so each schedule item is added under the specific users username.
2. Start by requiring a name and then when I see that the database model is up and running by posting the name then maybe add password and access token and implement different components from sign up and login. If the case then will need to implement authorization function to authorize the accesstoken when they want to login.
3. POST endpoint "user" for the username to be sent to the database so it set's up the users model where the users name and schedule events will be stored.  
4. POST endpoint "scheduleitem" that will post a new schedule item to the users model.
5. GET enpoint "schedule" data for a week for that user.
6. DELETE enpoint to delete a schedule item from the users model.
*/

/* Model structure for the username, password and access token. The fourth property is an array and object and the structure is for each schedule item that user will create
Added access token so this can be used to authorize the user when they want to login again */
const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: 5,
  //   maxlength: 30,
  // },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
    unique: true, 
  },
  scheduleitem: [{
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
  }],
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

// Route for user to create their account
app.post("/user", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await new User({username}).save();
    res.status(200).json({ userId: user._id, accessToken: user.accessToken, username: user.username, statusMessage: "User created" });
  } catch (error) {
    res.status(400).json({statusMessage: "Could not create user", error})
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
