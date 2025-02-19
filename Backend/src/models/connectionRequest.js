const mongoose = require("mongoose");
// const User = require('./User')

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  toUserId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: "string",
    enum: {
      values: ["ignored", "interested", "accepted", "rejected"],
      message: "{VALUE} is not a valid status",
    },
  },
});

connectionRequestSchema.pre("save", function (next) {
  // const connectionRequest = this
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("message : You cannot send request to yourself");
  }
  next();
});

const ConnectionRequest = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
