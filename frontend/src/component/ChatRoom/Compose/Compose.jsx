import React, { useState } from "react";
import "./Compose.css"
const Compose = () => {
  const [message, setMessage] = useState(""); // Lưu trữ giá trị input

  const handleInputChange = (e) => {
    setMessage(e.target.value); // Cập nhật giá trị khi người dùng nhập
  };

  return (
    <div className="col-foot">
      <div className="compose">
        <input
          type="text"
          id="message"
          placeholder="message"
          value={message} // Gắn giá trị của state vào input
          onChange={handleInputChange} // Xử lý sự kiện thay đổi input
        />
        <div className="compose-dock">
          <div className="dock">
            {/* <img src="./img/picture.svg" alt="Picture" />
            <img src="./img/smile.svg" alt="Smile" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;
