import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import Login from './components/Login';
import Register from './components/Register';
import VerifyUser from './components/VerifyUser';
import Proposals from './components/Proposals';
import Proposal from './components/Proposal';
import About from './components/About';
import Contact from './components/Contact';
import MyAccount from './components/MyAccount';
import RequireAuth from './layouts/RequireAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Proposals />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/proposals/:id" element={<Proposal />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-account" element={
          <RequireAuth  >
            <MyAccount />
          </RequireAuth>
        } />
      </Routes>
    </Router>
  );
}

export default App;
