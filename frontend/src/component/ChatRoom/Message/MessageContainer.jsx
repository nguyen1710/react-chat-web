import React from "react";
import "./Message.css";

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

const MessageContainer = () => {
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default MessageContainer;
