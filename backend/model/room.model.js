const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    require: true,
    unique: true
  },
  users: [ {
    type: String
  }],
  messages: [{
    username: String,
    content: String,
    time: String
  }]
})

const Room = mongoose.model("Room", roomSchema)

module.exports = Room