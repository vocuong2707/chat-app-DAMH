const express = require("express");
const cors = require("cors");
const connectDB = require("./src/configs/connectDB");

const authRouter = require("./src/routers/authRouter");
const userRoute = require("./src/routers/userRoute");
const messageRouter = require("./src/routers/messageRouter");
const groupRouter = require("./src/routers/groupRouter");
const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRoute);
app.use("/messages", messageRouter);
app.use("/groups", groupRouter);

connectDB();

const server = app.listen(PORT, () => {
  console.log("Server Started in", PORT);
});

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const userSockets = new Map();
socketIo.on("connection", (socket) => {
  socket.on("register", (userId) => {
    userSockets.set(userId, socket.id);
    socket.join(userId); // Thêm socket vào phòng với ID là userId
  });

  socket.on("createRoom", (data) => {
    const roomId = [data.userId, data.friendId].sort().join("-");
    socket.join(roomId);
  });
  socket.on("sendMessage", (message) => {
    socket.to(message.roomId).emit("receiveMessage", message);
  });
  socket.on("recallMessage", ({ messageId, room }) => {
    socket.to(room).emit("messageRecalled", messageId);
  });

  socket.on("disconnect", () => {});

  socket.on("groupCreated", ({ group, members }) => {
    members.forEach((memberId) => {
      socket.to(memberId).emit("newGroup", group);
    });
    console.log("groupCreated", group); 
  });

  socket.on("createRoomGroup", ({ userId, groupId }) => {
    socket.join(`group-${groupId}`);
  });

  socket.on("groupDeleted", ({ groupId, members }) => {
    members.forEach((memberId) => {
      socket.to(memberId).emit("groupDeleted", groupId);
      console.log("memberId", memberId);
      console.log("groupId", groupId);
    });
    console.log("groupDeleted", groupId);
  });

  socket.on("removeMember", (memberId, groupId) => {
    socket.to(groupId).emit("removeMember", memberId); // Broadcast to clients in the group
  });

  socket.on("makeCoLeader", ({ groupId, memberId }) => {
    socket.broadcast.to(groupId).emit("coLeaderMade", memberId);
  });

  
  // Xử lý sự kiện nhận tin nhắn nhóm
  socket.on("sendMessageGroup", (message) => {
    const { roomId, user, text } = message;
    socket.to(`group-${roomId.split("-")[1]}`).emit("receiveMessageGroup", {
      _id: Math.random().toString(36).substr(2, 9),
      user,
      text,
      createdAt: new Date().getTime(),
    });
    console.log("sendMessageGroup", message);
  });
  // Xu ly su kien thu hoi tin nhan nhom
  socket.on("recallMessageGroup", ({ messageId, roomId }) => {
    socket
      .to(`group-${roomId.split("-")[1]}`)
      .emit("messageRecalledGroup", messageId);
  });

  //xu ly su kien them thanh vien vao nhom
  socket.on("memberAdded", ({ group, members }) => {
    members.forEach((memberId) => {
      socket.to(memberId).emit("updateGroup", group);
    });
  });

  // Xu ly su kien chuyen quyen chu nhom
   socket.on("leaderMade", ({ groupId, memberId }) => {
     socket.to(groupId).emit("updateLeader", memberId);
     console.log(`Leader made: ${memberId} in group ${groupId}`);
   });
  
   socket.on("groupAddMember", ({ groupId, members }) => {
     members.forEach((memberId) => {
       socket.to(memberId).emit("groupAddMember", groupId);
       console.log("Emit groupAddMember to:", memberId);
     });
     socket.to(`group-${groupId}`).emit("newMemberAdded", groupId);
   });

     socket.on("dissolution", (groupId) => {
       socket.to(`group-${groupId}`).emit("dissolution");
     });

});
