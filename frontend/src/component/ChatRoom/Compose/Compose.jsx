import React, { useEffect, useState } from "react";
import "./Compose.css"
import socket from '~/socketio/socket'
import { formatTime } from "~/utils/formatTime";
import smile from "~/assets/img/smile.svg"
import picture from "~/assets/img/picture.svg"
// eslint-disable-next-line react/prop-types
const Compose = ({username, roomId}) => {
  const [message, setMessage] = useState(""); // Lưu trữ giá trị input
  const [currentTime, setCurrentime] = useState(new Date())
  // const handleInputChange = (e) => {
  //   setMessage(e.target.value); // Cập nhật giá trị khi người dùng nhập
  // };
  const handleEnter = (event) => {
    if(event.key === 'Enter') {
      
      if(message === "") {
        alert("Vui lòng nhập tin nhắn")
      }else {
        event.preventDefault(); // Ngăn chặn hành vi mặc định nếu cần
        console.log(`Enter press: ${username} | ${roomId} : ${message} ${formatTime(currentTime)} ` )
        let time = formatTime(currentTime)
        socket.emit("message", {username, message, roomId, time})
        setMessage("")
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="col-foot">
      <div className="compose">
        <input
          type="text"
          id="message"
          placeholder="Message"
          value={message} // Gắn giá trị của state vào input
          onChange={(e) => {setMessage(e.target.value)}} // Xử lý sự kiện thay đổi input
          onKeyDown={handleEnter}
        />
        <div className="compose-dock">
          <div className="dock">
            <img src={picture} alt="Picture" />
            <img src={smile} alt="Smile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;
