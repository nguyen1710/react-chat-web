import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Chuyển hướng tới trang /chat
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
                  <input id="username" type="text" name="username" />
                </div>
                <div className="form-group">
                  <label htmlFor="room">Room</label>
                  <input id="room" type="room" name="room" />
                </div>
                <div className="form-group">
                  <button type="submit">
                    <Link to="/chat" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Login
                    </Link>
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
