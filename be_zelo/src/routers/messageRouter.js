const express = require("express");

const {
  getMessages,
  addMessage,
  retrieveMessage,
  deleteMessage,
  forwardMessage,
  getGroupMessages,
  sendMessageToGroup,
  recallMessage
} = require("../controllers/messageController");

const router = express.Router();

router.get("/getMessages", getMessages);
router.post("/forward", forwardMessage);
router.post("/addMessage", addMessage);
router.patch("/:messageId/:senderId", retrieveMessage);
// router.delete("/:messageId", deleteMessage);
router.post("/sendMessageToGroup", sendMessageToGroup);
router.get("/getGroupMessages", getGroupMessages);
router.delete("/:messageId", recallMessage);

module.exports = router;