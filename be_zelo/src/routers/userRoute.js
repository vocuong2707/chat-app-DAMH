const express = require("express");
const { findUser, getUsers, findUserByEmail, sendFriendRequest,
    acceptFriendRequestAndSendMessage, getFriends,
    getSendFriendRequest, deleteSendFriendRequest,
    updateInfoUser } = require("../controllers/userController");
const uploadFiles = require("../uploads/uploadFile");



const router = express.Router();
router.get("/", getUsers);
router.get("/find/:userId", findUser);
router.get("/findUserByEmail/:email", findUserByEmail);
router.post("/sendFriendRequest", sendFriendRequest);
router.post("/upload/:userId", uploadFiles);
router.post("/acceptFriendRequestAndSendMessage", acceptFriendRequestAndSendMessage);
router.get("/getFriends/:userId", getFriends);
router.get("/getSendFriendRequest/:userId", getSendFriendRequest);
router.delete("/deleteSendFriendRequest", deleteSendFriendRequest);
router.put("/updateInfoUser/:userId", updateInfoUser);


module.exports = router;
