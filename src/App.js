import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Hall from './pages/Hall';
import Table from './components/Table.js';
import Setting from './pages/Setting';
import ResetPassword from './pages/ResetPassword.js';
import NotFound from './pages/NotFound.js';
function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/resetpassword" element={<ResetPassword/>} />
      <Route path="/hall" element={<Hall />} />
      <Route path="/table" element={<Table />} />
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
