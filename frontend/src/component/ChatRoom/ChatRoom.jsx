import React, { useEffect, useRef, useState } from 'react'
import avt1 from '~/assets/img/avatar-1.png'
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
    // const [users , setUsers] = useState([])


    useEffect(() => {
        if(firstRenderRef.current === true) {
            socket.emit("join", { roomId, username });
        }
        if(firstRenderRef &&firstRenderRef.current === true) {
            firstRenderRef.current = false
        }
        
    },[])

    // useEffect(() => {
    //     // Lắng nghe sự kiện "thread" từ server
    //     socket.on("loadUsers", (data) => {
    //       // Khi nhận được dữ liệu từ server, thêm tin nhắn vào state
    //       setUsers(data.users)
    //     });
    //     console.log(users)
    //     // Dọn dẹp khi component bị unmount
    //     return () => {
    //       socket.off("loadUsers");
    //     };
    //   }, [users]); // Chỉ chạy 1 lần khi component được mount


    // useEffect(() => {
    //     console.log(username, roomId)
    //     if(username && roomId) {
    //     }

    //     return () => {
    //         socket.off("connect"); // Dọn dẹp sự kiện để tránh trùng lặp
    //     };
    // }, [username, roomId])


    useEffect(() => {
        const fetchRoomData = async () => {
            try{
                const response = await axios.get(`http://localhost:2312/api/rooms/${roomId}`)
                setRoomData(response.data)
            }catch(error) {
                console.log("Lỗi khi lấy dữ liệu phòng: ", error)
            }
        }

        fetchRoomData()
    },[roomId])
    // console.log(roomData.users)
    // if (roomData && roomData.users) {
    //   console.log("Danh sách người dùng trong phòng:", roomData.users); // In ra danh sách người dùng
    // }
    useEffect(() => {
        
    })
    
    // console.log(roomData)
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
                        {/* Các mục người dùng sẽ được thêm vào đây */}
                        {/* <li>
                            <div className="avatar">
                                <div className="avatar-image">
                                <div className="status online"></div>
                                <img src={avt1} alt="User Avatar" />
                                </div>
                            </div>
                            <h3>Nancy Scott</h3>
                            <p>Đang Online</p>
                        </li> */}
                        { roomData ? (Array.isArray(roomData.users) && roomData.users.map((user, index) => {
                                return (
                                    <li key={index}>
                                <div className="avatar">
                                    <div className="avatar-image">
                                    <div className="status online"></div>
                                    <img src={avt1} alt="User Avatar" />
                                    </div>
                                </div>
                                <h3>{user}</h3>
                                <p>Đang Online</p>
                            </li>
                                )
                            })) : <p>Đang tải dữ liệu...</p>                           
                        }
                    </ul>

                    {/* <ul id="userList">
                        <!-- Các mục người dùng sẽ được thêm vào đây -->

                        </ul> */}
                    </div>
                </div>
            </div>


            {/* chat-section
            <div className="col">
                <div className="col-content" style={{ marginBottom: "5%" }}>
                    <section className="message">
                    <div className="grid-message">
                        <Message 
                            type="received" 
                            name="Nancy Scott" 
                            time="9:00 PM" 
                            text="Ok."
                        />
                        <Message 
                            type="sent" 
                            name="You" 
                            time="9:05 PM" 
                            text="Not anymore."
                        />
                    </div>
                    </section>
                </div>
            </div>        */}
            <MessageContainer username={username} roomId={roomId} roomData={roomData}/>

            <Compose username={username} roomId={roomId}/>

    
    </>
  )
}

export default ChatRoom