import React, { useEffect, useRef } from 'react'
import avt1 from '~/assets/img/avatar-1.png'
import setting from '~/assets/img/settings.svg'
import "./ChatRoom.css"
import Compose from './Compose/Compose'
import MessageContainer from './Message/MessageContainer'
import socket from '../../socketio/socket'
import { useLocation } from 'react-router-dom';

function ChatRoom() {
    // const [messages, setMessages] = useState([]);
    // const [newMessage, setNewMessage] = useState('');
    const firstRenderRef = useRef(true)

    const location = useLocation();
    // Lấy `username` và `roomId` từ query params
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('name');
    const roomId = searchParams.get('roomId');

    

    useEffect(() => {
        if(firstRenderRef.current === true) {
            socket.emit("join", { roomId, username });
        }
        if(firstRenderRef &&firstRenderRef.current === true) {
            firstRenderRef.current = false
        }
        
    },[])
    // useEffect(() => {
    //     console.log(username, roomId)
    //     if(username && roomId) {
    //     }

    //     return () => {
    //         socket.off("connect"); // Dọn dẹp sự kiện để tránh trùng lặp
    //     };
    // }, [username, roomId])

    
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
                    <li style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '20px' }}>Số người trong phòng</p>
                    </li>

                    {/* Hiển thị danh sách người dùng */}
                    <ul id="userList">
                        {/* Các mục người dùng sẽ được thêm vào đây */}
                        <li>
                        <div className="avatar">
                            <div className="avatar-image">
                            <div className="status online"></div>
                            <img src={avt1} alt="User Avatar" />
                            </div>
                        </div>
                        <h3>Nancy Scott</h3>
                        <p>Đang Online</p>
                        </li>

                        <li>
                        <div className="avatar">
                            <div className="avatar-image">
                            <div className="status online"></div>
                            <img src={avt1} alt="User Avatar" />
                            </div>
                        </div>
                        <h3>Nancy Scott</h3>
                        <p>Đang Online</p>
                        </li>
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
            <MessageContainer/>

            <Compose/>

    
    </>
  )
}

export default ChatRoom