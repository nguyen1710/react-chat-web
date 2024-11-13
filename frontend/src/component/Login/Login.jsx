// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// function Login() {
//   const [ username, setUsername ] = useState('')
//   const [ room, setRoom ] = useState('')
//   const navigate = useNavigate()
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Chuyển hướng tới trang /chat
//     if (username && room) {
//       navigate(`/chat?name=${username}&roomId=${room}`);
//     } else {
//       alert("Vui lòng nhập đầy đủ thông tin!");
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         <div className="form">
//           <div className="form-toggle"></div>
//           <div className="form-panel one">
//             <div className="form-header">
//               <h1>Account Login</h1>
//             </div>
//             <div className="form-content">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="username">Username</label>
//                   <input 
//                     id="username" 
//                     type="text" 
//                     name="username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)} />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="room">Room</label>
//                   <input 
//                     id="room" 
//                     type="text" 
//                     name="room"
//                     value={room}
//                     onChange={(e) => setRoom(e.target.value)} />
//                 </div>
//                 <div className="form-group">
//                   <button type="submit">
//                       Login
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '~/assets/img/logo.svg'
import axios from 'axios';
function Login() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [users , setUsers] = useState([])

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Kiểm tra dữ liệu hợp lệ và điều kiện
    if (username.trim() && room.trim()) {
      // Đảm bảo không có lỗi khi chuyển hướng
      if (users.includes(username)) {
        alert("Username này đã tồn tại trong phòng, vui lòng chọn tên khác.");
    } else {
        // Nếu username chưa có trong users, chuyển hướng đến trang chat
        navigate(`/chat?name=${encodeURIComponent(username)}&roomId=${encodeURIComponent(room)}`);
    }    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  useEffect(() => {
    const fetchRoomData = async () => {
        try{
            const response = await axios.get(`http://localhost:2312/api/rooms/${room}`)
            setUsers(response.data.users || [])
        }catch(error) {
            console.log("Lỗi khi lấy dữ liệu phòng: ", error)
        }
    }

    fetchRoomData()
  },[room])

  return (
    <>
      <div className="container">
        <div className="form">
          <div className="form-toggle"></div>
          <div className="form-panel one">
            <div className="form-header">
              <img src={logo}/>
              <h1>Account Login</h1>
            </div>
            <div className="form-content">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="room">Room</label>
                  <input
                    id="room"
                    type="text"
                    name="room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <button type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

