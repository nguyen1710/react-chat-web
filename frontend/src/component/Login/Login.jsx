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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Kiểm tra dữ liệu hợp lệ và điều kiện
    if (username.trim() && room.trim()) {
      // Đảm bảo không có lỗi khi chuyển hướng
      navigate(`/chat?name=${encodeURIComponent(username)}&roomId=${encodeURIComponent(room)}`);
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  return (
    <>
      <div className="container">
        <div className="form">
          <div className="form-toggle"></div>
          <div className="form-panel one">
            <div className="form-header">
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

