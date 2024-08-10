const UserModel = require("../models/userModel");
const MessagesModel = require("../models/messageModel");


const findUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const findUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params; // Lấy địa chỉ email từ request params
    // Tìm kiếm người dùng trong cơ sở dữ liệu
    const user = await UserModel.findOne({ email });

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng với địa chỉ email này",
      });
    }

    // Trả về thông tin của người dùng nếu tìm thấy
    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

const sendFriendRequest = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;


    // Tìm người gửi và người nhận
    const sender = await UserModel.findById(senderId);
    console.log(sender);
    const receiver = await UserModel.findById(receiverId);
    console.log(receiver);
    // Kiểm tra xem người nhận có tồn tại không
    if (!receiver) {
      return res.status(404).json({ error: "Người nhận không tồn tại" });
    }

    // Kiểm tra xem người nhận có trong danh sách bạn bè của người gửi không
    if (sender.friendRequests.includes(receiver._id)) {
      return res
        .status(400)
        .json({ error: "Bạn đã gửi lời mời kết bạn đến người này trước đó" });
    }

    sender.friendRequests.push(receiver._id);
    await sender.save();

    receiver.receivedFriendRequests.push(sender._id);
    await receiver.save();

    return res.json({ message: "Lời mời kết bạn đã được gửi thành công" });
  } catch (error) {
    next(error);
  }
};

const acceptFriendRequestAndSendMessage = async (req, res, next) => {
  try {
    const { userId, friendId } = req.body;
    console.log(userId, friendId);

    // Tìm người gửi (người chấp nhận lời mời kết bạn) và người nhận (người gửi lời mời kết bạn)
    const sender = await UserModel.findById(userId);
    const receiver = await UserModel.findById(friendId);

    console.log(sender, receiver);

    // Kiểm tra xem người gửi và người nhận có tồn tại không
    if (!sender || !receiver) {
      return res
        .status(404)
        .json({ error: "Người gửi hoặc người nhận không tồn tại" });
    }

    // Kiểm tra xem người gửi có trong danh sách lời mời kết bạn của người nhận không
    if (!receiver.friendRequests.includes(sender._id)) {
      return res
        .status(400)
        .json({ error: "Người này không gửi lời mời kết bạn đến bạn" });
    }

    // Thêm người gửi vào danh sách bạn bè của người nhận
    receiver.friends.push(sender._id);
    // Xóa người gửi khỏi danh sách lời mời kết bạn của người nhận
    receiver.friendRequests = receiver.friendRequests.filter(
      (id) => id.toString() !== sender._id.toString()
    );

    // Thêm người nhận vào danh sách bạn bè của người gửi
    sender.friends.push(receiver._id);
    // Xóa người nhận khỏi danh sách lời mời kết bạn của người gửi
    sender.receivedFriendRequests = sender.receivedFriendRequests.filter(
      (id) => id.toString() !== receiver._id.toString()
    );
    await sender.save();
    await receiver.save();

    const defaultMessage = "Tôi đã chấp nhận lời mời của bạn";
    const messageData = await MessagesModel.create({
      message: { text: defaultMessage },
      users: [sender._id.toString(), receiver._id.toString()],
      sender: sender._id,
    });

    if (messageData)
      return res.json({
        message:
          "Chấp nhận lời mời kết bạn thành công và tạo tin nhắn thành công",
      });
    else return res.json({ message: "Failed to create message" });
  } catch (error) {
    next(error);
  }
};

//get receivedFriendRequests
const getSendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId)
      .populate({
        path: "receivedFriendRequests",
        select: "_id fullname email photoUrl"
      });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.receivedFriendRequests);
    console.log(user.receivedFriendRequests);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// get all friends of a user
const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId)
      .populate({
        path: "friends",
        select: "_id fullname email photoUrl gender dateOfBirth"
      });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.friends);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//delete sendFriendRequest
const deleteSendFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    const user = await UserModel.findById(userId);
    const friend = await UserModel.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ error: "User not found" });
    }
    user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId.toString());
    friend.receivedFriendRequests = friend.receivedFriendRequests.filter(id => id.toString() !== userId.toString());
    await user.save();
    await friend.save();
    res.status(200).json({ message: "Delete send friend request successfully" });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
const updateInfoUser = async (req, res) => {
  const { userId } = req.params;
  const { fullname, dateOfBirth, gender } = req.body;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.fullname = fullname;
    user.dateOfBirth = dateOfBirth;
    user.gender = gender;
    await user.save();
    //thong báo cập nhật thành công và trả về thông tin user
    res.status(200).json({ message: "Update user info successfully", user });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}




module.exports = {
  findUser,
  getUsers,
  findUserByEmail,
  sendFriendRequest,
  acceptFriendRequestAndSendMessage,
  getFriends,
  getSendFriendRequest,
  deleteSendFriendRequest,
  updateInfoUser

};
