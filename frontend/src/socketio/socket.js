import { io } from 'socket.io-client'

const socket = io.connect("http://localhost:2312")

export default socket