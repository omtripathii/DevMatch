const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/User");
const USER_SAFE_DATA = "firstName lastName about photoUrl skills age gender";

// Get API to fetch all the received requests for a User
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    const newData = connectionRequests.map((item) => item.fromUserId);
    if (!connectionRequests) {
      return res.status(404).json({ message: "No Requests are Pending" });
    }

    res.status(200).json({ message: "Your Pending Requests: ", newData });
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
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connectionRequests;
    const newData = data.map((item) => {
      if (item.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return item.toUserId;
      }
      return item.fromUserId;
    });
    res.status(200).json({ message: "Your Connection are ", newData });
  } catch (error) {
    res.status(400).send("Something went wrong " + error);
  }
});

// User Feed API
userRouter.get("/user/feed", userAuth, async (req, res) => {
  /**
   * Logged In user should not see his profile himself
     Logged In user should not see the profile he seem to be interested or has ignored
     Should not see the users who are already his connections
   */
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUserList = new Set();
    connectionRequest.forEach((item) => {
      hideUserList.add(item.fromUserId.toString());
      hideUserList.add(item.toUserId.toString());
    });

    const feedShow = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserList) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.status(200).send(feedShow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = userRouter;
