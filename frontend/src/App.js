import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import IntroductionPage from './IntroductionPage/IntroductionPage';
import JoinRoomPage from './JoinRoomPage/JoinRoomPage';
import RoomPage from './RoomPage/RoomPage';
import { connectWithSocketIOServer } from './utils/wss';
import './App.css';
function App() {

  useEffect(() => {
     connectWithSocketIOServer();
  },[]);

  return (
    <Router>
      <Routes>
        <Route exact path="/join-room" element={<JoinRoomPage />} />
        <Route exact path="/room" element={<RoomPage />} />
        <Route exact path="/" element={<IntroductionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
