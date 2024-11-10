import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Login/Login';
import ChatRoom from './component/ChatRoom/ChatRoom';

function App() {
  const [, setState] = useState(0);

  return (
    <Router>
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
