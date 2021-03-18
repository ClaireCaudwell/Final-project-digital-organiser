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
  