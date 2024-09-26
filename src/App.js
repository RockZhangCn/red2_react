import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Table from './components/Table.js';
import Setting from './pages/Setting';
import ResetPassword from './pages/ResetPassword.js';
import NotFound from './pages/NotFound.js';
import GameBoard from './pages/GameBoard.js';
import { useDispatch,  } from 'react-redux';
import { useEffect,  } from 'react';
import { restoreUserStateAction } from './actions/userActions.js';
import { restoreGameHallDataAction } from './actions/gameActions.js';


function App() {

  const dispatch = useDispatch();
  console.log("AAAAA app begin to render");
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch(restoreUserStateAction(JSON.parse(savedUser))); // 恢复 Redux 状态
    }

    const gameHall = localStorage.getItem('gamehall');
    console.log("AAAAA app to restore gamehall", gameHall)
    if (gameHall) {
      dispatch(restoreGameHallDataAction(JSON.parse(gameHall)));
    }
   
  }, [dispatch]);

  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/resetpassword" element={<ResetPassword/>} />
      <Route path="/playing/:tableId" element={<GameBoard />} />
      <Route path="/setting" element={<Setting />} />
      
      {/* Default route */}
      <Route path="*" element={<Navigate to="/not-found" />} />
      {/* Not Found route */}
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  </Router>



  );
}

export default App;
