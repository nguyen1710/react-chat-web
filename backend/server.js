const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const socket_IO = require('socket.io');
const http = require('http');
const server = http.Server(app);
const cors = require('cors');

const dotenv = require('dotenv');
const connectToDB = require('./database/db.js');
dotenv.config();
const Room = require('./model/room.model.js');

const port = process.env.PORT || 8081;

// Cấu hình CORS cho Express
app.use(cors({
  origin: 'http://localhost:5173',  // Cho phép frontend React
  methods: ['GET', 'POST'],
}));

// Cấu hình Socket.io với CORS
const io = socket_IO(server, {
  cors: {
    origin: 'http://localhost:5173',  // Cho phép frontend React
    methods: ['GET', 'POST'],
  }
});

// Middleware để xử lý JSON và URL-encoded data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lắng nghe kết nối từ client
io.on("connection", function(client) {
  let session_username, id;
  console.log("Có người tham gia");

  client.on("join", async function (data) {
    const { roomId, username } = data;
    console.log(`Người dùng ${username} tham gia vào phòng ${roomId}`);
    client.join(roomId);

    
    id = roomId
    session_username = username
    
    let room = await Room.findOne({roomId : id})
    if (!room) {
      try {
        room = await Room.create({ roomId: roomId, users: [username], messages: [] });
        console.log("Tạo phòng mới:", room);
        // client.emit("loadMessages", {messages: room.messages, users: room.users})
      } catch (err) {
        console.error("Lỗi khi tạo phòng:", err);
      }
    } else {
        // client.emit("loadMessages", {messages: room.messages, users: room.users})
        client.emit("loadMessages", {users: room.users})

        if (!room.users.includes(username)) {
            room.users.push(username); // Thêm username vào danh sách người dùng
            await room.save(); // Lưu lại sự thay đổi
            console.log(`Thêm ${username} vào danh sách người dùng trong phòng ${roomId}`);
            // io.to(roomId).emit("updateUserList", username);
            console.log(room.users)
            // io.to(roomId).emit("")
    
          }
          else {
            console.log(`Người dùng đã tồn tại`)
          }
    }
  })

   //khi gửi tin
   client.on("message", async function(data){ //data là dữ liệu hay tin nhắn
    //khi gửi tin nhắn thì sẽ chuyển lên server và server sẽ chuyển tới room
    const {username, message, roomId, time} = data
    console.log(`${username} : ${message} + ${roomId} + + ${time}`)
    let id = roomId
    let room = await Room.findOne({roomId : id})
    room.messages.push({username: username, content: message, time: time})
    await room.save();
    io.to(roomId).emit("thread", {username, message, time})
  })

  client.on("disconnect", async function() {
    //đăng nhập lưu vào session lấy ra xài
    let updatedRoom = await Room.findOne({ roomId: id });
    if (updatedRoom) {
      io.to(id).emit("removeUserList", session_username); // Cập nhật danh sách user
      updatedRoom.users = updatedRoom.users.filter(user => user !== session_username);

      if (updatedRoom.users.length === 0) {
        await Room.deleteOne({ roomId: id });
        console.log(`Room ${id} đã bị xóa vì không còn người dùng nào.`);
      } else {
          console.log(`Người dùng ${session_username} đã bị xóa.`);
          await updatedRoom.save(); // Lưu lại sự thay đổi
      }
    }
    else{
      console.log("không tồn tại phòng")
    }
  })

});

app.get('/api/rooms/:roomId', async (req, res) => {
  const {roomId} = req.params

  try {
    const room = await Room.findOne({roomId})
    if(!room) {
      return res.status(404).json({message: "Phòng không tồn tại"})
    }
    res.json(room)
  } catch(err){
    console.error("Lỗi không tìm thấy phòng:", err)
    res.status(500).json({message: "Lỗi server"})
  }
})

// Kết nối đến cơ sở dữ liệu
connectToDB().then(() => {
  server.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
  });
});
