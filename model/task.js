const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema with timestamps!
const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: true
    },
    workers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
      }
    ],
    grade: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
