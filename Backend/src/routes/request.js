const express = require("express");
const requestAuth = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/User");
const {run} = require("../utils/sendEmail")
// Sending the connection request
requestAuth.post("/request/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const isAllowedStatus = ["ignored", "interested"];
    if (!isAllowedStatus.includes(status)) {
      return res.status(400).send("Invalid status request");
    }

    const ifUserAlreadyExists = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (ifUserAlreadyExists) {
      return res.status(400).send("Request already exists");
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.send(400).send("User not exists by this Id");
    }
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    const emailSend = await run()
    console.log(emailSend);
    res.status(200).json({
      message: "The connection request sent successsfully",
      data,
    });
  } catch (error) {
    return res.status(400).send("Something went wrong " + error);
  }
});

// Receiving the connection request

requestAuth.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedinUser = req.user;
      const { status, requestId } = req.params;

      // Status validation it should be either accepted or rejected
      const isAllowedStatus = ["accepted", "rejected"];
      if (!isAllowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status is not valid" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        //if this requestId in db or not
        _id: requestId,
        //The logged in user should be the receiver one i cannot accept my own sent request
        toUserId: loggedinUser._id,
        // The status should be interested , the ignored one should not be there
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection Request does not exist" });
      }
      // Change the status in the DB
      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.status(200).json({
        message: "Connection request " + status + " succesfully",
        data: connectionRequest,
      });
    } catch (error) {
      res.status(400).send("Something went wrong " + error);
    }
  }
);

module.exports = requestAuth;
