import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import RoomPage from './RoomPage/RoomPage';
import { connectWithSocketIOServer } from './utils/wss';
function App() {

  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<RoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
