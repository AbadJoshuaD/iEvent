const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating user schema on MongoDB
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
});

module.exports = mongoose.model("Users", userSchema);
