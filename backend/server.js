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
// app.use(cors({
//   origin: 'http://localhost:5173',  // Cho phép frontend React
//   methods: ['GET', 'POST'],
// }));

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
        client.emit("loadMessages", {messages: room.messages, users: room.users})
      } catch (err) {
        console.error("Lỗi khi tạo phòng:", err);
      }
    } else {
        if (!room.users.includes(username)) {
            room.users.push(username); // Thêm username vào danh sách người dùng
            await room.save(); // Lưu lại sự thay đổi
            console.log(`Thêm ${username} vào danh sách người dùng trong phòng ${roomId}`);
            // io.to(roomId).emit("updateUserList", username);
            console.log(room.users)

    
          }
          else {
            console.log(`Người dùng đã tồn tại`)
          }

    }
  });
});

// Kết nối đến cơ sở dữ liệu
connectToDB().then(() => {
  server.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
  });
});
