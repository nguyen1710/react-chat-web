import React, { useEffect, useRef, useState } from 'react'

import avt1 from '~/assets/img/avatar-1.png'
import avt2 from '~/assets/img/avatar-2.png'
import avt3 from '~/assets/img/avatar-3.png'
import avt4 from '~/assets/img/avatar-4.png'
import avt5 from '~/assets/img/avatar-5.png'

import setting from '~/assets/img/settings.svg'
import "./ChatRoom.css"
import Compose from './Compose/Compose'
import MessageContainer from './Message/MessageContainer'
import socket from '../../socketio/socket'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
function ChatRoom() {
    // const [messages, setMessages] = useState([]);
    // const [newMessage, setNewMessage] = useState('');
    const firstRenderRef = useRef(true)

    const location = useLocation();
    // Lấy `username` và `roomId` từ query params
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('name');
    const roomId = searchParams.get('roomId');
    const [roomData, setRoomData] = useState(null)
    const [users , setUsers] = useState([])


    useEffect(() => {
        if(firstRenderRef.current === true) {
            socket.emit("join", { roomId, username });
        }
        if(firstRenderRef &&firstRenderRef.current === true) {
            firstRenderRef.current = false
        }
        
    },[])

    useEffect(() => {
        // Lắng nghe sự kiện 'removeUserList' từ server
        socket.on("updateUserList", (data) => {
          setUsers(data.users);
        });
    
        // Khi component unmount, tắt kết nối
        return () => {
          socket.off("updateUserList");
        };
      }, []);

      useEffect(() => {
        // Lắng nghe sự kiện 'removeUserList' từ server
        socket.on("removeUserList", (users) => {
          setUsers((prevUsers) => prevUsers.filter((user) => user !== users));
        });
    
        // Khi component unmount, tắt kết nối
        return () => {
          socket.off("removeUserList");
        };
      }, []);


    useEffect(() => {
        const fetchRoomData = async () => {
            try{
                const response = await axios.get(`http://localhost:2312/api/rooms/${roomId}`)
                setRoomData(response.data)
                setUsers(response.data.users || [])
            }catch(error) {
                console.log("Lỗi khi lấy dữ liệu phòng: ", error)
            }
        }

        fetchRoomData()
    },[roomId])
    console.log(users)
    return (
    <>
        <header>
        <div className="container">
            <div className="middle">
            <h3>Tôi</h3>
            <p>NodeSending -- {roomId}</p>
            </div>
            <div className="right">
            <div className="username">
                <div className="settings">
                <img src={setting} alt="Settings" />
                </div>
                {username}
                <div className="user-avatar">
                <img src={avt1} alt="User Avatar" />
                </div>
            </div>
            </div>
        </div>
        </header> 

 
        <div className="col-left" style={{ position: 'fixed', top: 0, height: '100%' }}>
            <div className="col-content">
                <div className="messages">
                    {/* <li style={{ textAlign: 'center' }}> */}
                        <p style={{ fontSize: '20px', color: '#0182ff' }}>Số người trong phòng</p>
                    

                    {/* Hiển thị danh sách người dùng */}
                    <ul id="userList">
                        { users.length > 0 ? (Array.isArray(users) && users.map((user, index) => {
                            // Tạo mảng chứa các ảnh avatar
                            const avatars = [
                                avt1, avt2, avt3, avt4, avt5
                            ];

                            // Random một avatar ngẫu nhiên từ mảng
                            const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
                                return (
                                    <li key={index}>
                                <div className="avatar">
                                    <div className="avatar-image">
                                    <div className="status online"></div>
                                    <img src={randomAvatar} alt="User Avatar" />
                                    </div>
                                </div>
                                <h3>{user}</h3>
                                <p>Đang Online</p>
                            </li>
                                )
                            })) : <p>Đang tải dữ liệu...</p>                           
                        }
                    </ul>
                </div>
            </div>
        </div>

        <MessageContainer username={username} roomId={roomId} roomData={roomData}/>

        <Compose username={username} roomId={roomId}/>

    
    </>
  )
}

export default ChatRoom