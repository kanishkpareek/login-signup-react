import './App.css';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import Logout from './components/Logout.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Login />}></Route>
        <Route exact path='/sign-up' element={<Register />}></Route>
        <Route exact path='/dashboard' element={<Dashboard />}></Route>
        <Route exact path='/logout' element={<Logout />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
