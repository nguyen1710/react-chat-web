import React, { useState, useEffect } from "react";
import "./Message.css";
import socket from '~/socketio/socket'

// eslint-disable-next-line react/prop-types
const Message = ({ type, name, text, time }) => {
  return (
    // Đảm bảo JSX hợp lệ bằng cách sử dụng dấu ngoặc đơn bao quanh return
    <div className={`col-${type}`}>
      {type === "message-received" ? (
        <>
            <p>{name} {time}</p>
              <div className={type}>
                <p>{text}</p>
              </div>
        </>
      
      ) : (
        <div className={type}>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

const MessageContainer = ({username, roomId}) => {
  const [messages , setMessages] = useState("")


  useEffect(() => {
    // Lắng nghe sự kiện "thread" từ server
    socket.on("thread", (data) => {
      // Khi nhận được dữ liệu từ server, thêm tin nhắn vào state
      setMessages((prevMessages) => [
        ...prevMessages,
        { username: data.username, content: data.message, time: data.time }
      ]);
      

    });
    console.log(messages)
    // Dọn dẹp khi component bị unmount
    return () => {
      socket.off("thread");
    };
  }, [messages]); // Chỉ chạy 1 lần khi component được mount

  return (
    <div className="col" style={{ position: 'absolute', top: 0, right: 0, height: '100%' }}>
      <div className="col-content">
        <section className="message">
          <div className="grid-message">
            <Message type="message-received" name="Travis Cod" time="9:30" text="Hello! How are you?" />
            <Message type="message-sent" text="lotsdfasdddddddddlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđdddddddddddddđ" />
            <Message type="message-sent" text="Hello xin chào các bạn" />
            <Message type="message-received" text="I'm good,thanks!" />
            <Message type="message-received" text="I'm good,thanks!" />
            <Message type="message-received" name="Travis Cod" time="9:30" text="Hello! How are you?" />
            <Message type="message-received" name="Travis Cod" time="9:30" text="Hello! How are you?" />

            <Message type="message-sent" text="I'm good,thanks!" />
            <Message type="message-received" text="lotsdfasdddddddddlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđdddddddddddddđ" />
            <Message type="message-received" name="Travis Cod" time="9:30" text="Hello! How are you?" />
            <Message type="message-sent" text="Hello xin chào các bạn" />
            <Message type="message-received" name="Travis Cod" time="9:30" text="Hello! How are you?" />
            <Message type="message-sent" text="lotsdfasdddddddddlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđdddddddddddddđ" />
            <Message type="message-sent" text="Hello xin chào các bạn" />
            <Message type="message-received" text="I'm good,thanks!" />
            <Message type="message-received" text="I'm good,thanks!" />
            <Message type="message-received" name="Travis Cod" time="9:30" text="Hello! How are you?" />
            <Message type="message-received" name="Travis Cod" time="9:30" text="Hello! How are you?" />

            <Message type="message-sent" text="I'm good,thanks!" />
            <Message type="message-received" text="lotsdfasdddddddddlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđlotsdfasddddddddddddddddddddddđdddddddddddddđ" />
            <Message type="message-received" name="Travis Cod" time="9:30" text="Hello! How are you?" />
            <Message type="message-sent" text="Hello xin chào các bạn" />
          
            {Array.isArray(messages) && messages.map((msg, index) => {
               if(msg.username === username) {
               return <Message key={index} type="message-sent" text={msg.content} />;
                } else {
                return <Message key={index} type="message-received" name={msg.username} time={msg.time} text={msg.content} />;
              }
            })}

          </div>
        </section>
      </div>
    </div>
  );
};

export default MessageContainer;
