const MessagesModel = require("../models/messageModel");
const addMessage = async (req, res, next) => {
  try {
    const { from, to, message, avatar } = req.body;
    const data = await MessagesModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
      avatar: avatar,
    });

    if (data)
      return res.json({ msg: "Message added successfully.", data: data });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.query; // Use req.query instead of req.body

    const messages = await MessagesModel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        id: msg._id, // Include the ID of the message
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        createdAt: msg.createdAt,
        isHidden: msg.isHidden,
        avatar: msg.avatar,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};
const forwardMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    // Xác định số lượng người nhận tin nhắn
    const recipients = Array.isArray(to) ? to : [to];

    // Hàm gửi tin nhắn cho từng người dùng một cách tuần tự
    async function sendMessageToRecipients(recipients) {
      for (let i = 0; i < recipients.length; i++) {
        const recipient = recipients[i];

        // Tạo tin nhắn
        const data = await MessagesModel.create({
          message: { text: message },
          users: [from, recipient],
          sender: from,
        });

        // Kiểm tra kết quả và gửi phản hồi
        if (!data) {
          return res
            .status(500)
            .json({ msg: "Failed to add message to the database" });
        }
      }
      return res.json({ msg: "Messages added successfully." });
    }

    // Gửi tin nhắn cho từng người dùng một cách tuần tự
    await sendMessageToRecipients(recipients);
  } catch (ex) {
    next(ex);
  }
};

const retrieveMessage = async (req, res, next) => {
  try {
    const { messageId, senderId } = req.params;
    console.log(messageId, senderId);
    const message = await MessagesModel.findOneAndUpdate(
      { _id: messageId, sender: senderId },
      { $set: { isHidden: true } },
      { new: true }
    );
    console.log(message);
    // Nếu không tìm thấy tin nhắn, trả về lỗi
    if (!message) {
      return res
        .status(404)
        .json({ error: "Message not found or not sent by the sender" });
    }

    // Trả về tin nhắn đã được cập nhật
    return res.json({
      message: "Message retrieved successfully",
      updatedMessage: message,
    });
  } catch (ex) {
    next(ex);
  }
};

const deleteMessage = async (req, res, next) => {
  // try {
  //   const { messageId } = req.params;
  //   const message = await MessagesModel.findById(messageId);

  //   if (!message) {
  //     return res.status(404).json({ error: "Message not found" });
  //   }

  //   await MessagesModel.findByIdAndUpdate(messageId, {
  //     "message.text": "đã thu hồi 1 tin nhắn",
  //   });

  //   return res.json({ message: "Message deleted successfully" });
  // } catch (ex) {
  //   next(ex);
  // }
};
const recallMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const message = await MessagesModel.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    await MessagesModel.findByIdAndUpdate(messageId, {
      "message.text": "đã thu hồi 1 tin nhắn",
    });

    return res.json({ message: "Message recalled successfully" });
  } catch (ex) {
    next(ex);
  }
};




const getGroupMessages = async (req, res, next) => {
  try {
    const { groupId, from } = req.query;

    // const messages = await MessagesModel.find({ group: groupId })
    //   .sort({ updatedAt: 1 })
    //   .populate('sender', 'fullname', 'photoUrl'); // Populate thông tin người gửi
    const messages = await MessagesModel.find({ group: groupId })
      .sort({ updatedAt: 1 })
      .populate('sender', 'fullname photoUrl'); // Populate thông tin người gửi

    const projectedMessages = messages.map((msg) => {
      return {
        id: msg._id,
        fromSelf: msg.sender._id.toString() === from,
        message: msg.message.text,
        createdAt: msg.createdAt,
        isHidden: msg.isHidden,
        group: msg.group,
        avatar: msg.avatar,
        sender: {
          id: msg.sender._id,
          name: msg.sender.fullname,
          avatar: msg.sender.photoUrl,

        },
      };
    });

    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

const sendMessageToGroup = async (req, res, next) => {
  try {
    const { to, from, message, avatar } = req.body; // Lấy thông tin từ yêu cầu

    const newMessage = await MessagesModel.create({
      message: { text: message }, // Nội dung tin nhắn
      users: [from, to],
      group: to, // ID của nhóm
      sender: from, // Người gửi
      avatar: avatar,
    });

    if (newMessage) {
      return res.json({ message: "Message sent to group successfully", data: newMessage });
    } else {
      return res.status(500).json({ error: "Failed to send message to group" });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  getMessages,
  addMessage,
  retrieveMessage,
  deleteMessage,
  forwardMessage,
  getGroupMessages,
  sendMessageToGroup,
  recallMessage,
};