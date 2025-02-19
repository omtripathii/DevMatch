const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName about photoUrl skills";

// Get API to fetch all the received requests for a User
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    if (!connectionRequests) {
      return res.status(404).json({ message: "No Requests are Pending" });
    }

    res
      .status(200)
      .json({ message: "Your Pending Requests: ", connectionRequests });
  } catch (error) {
    res.status(400).send("Something went wrong " + error);
  }
});

// Getting the Connection details
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
    const data = connectionRequests;
    const newData = data.map((item) => {
      if(item.fromUserId._id.toString() === loggedInUser._id.toString() ){
        return item.toUserId
      }
      return item.fromUserId
    }
    );
    res.status(200).json({ message: "Your Connection are ", newData });
  } catch (error) {
    res.status(400).send("Something went wrong " + error);
  }
});

module.exports = userRouter;
